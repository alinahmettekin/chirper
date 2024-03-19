const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const db = pgp("postgresql://postgres:123456@localhost:5432/botApp");
const port = 3000;
const session = require("express-session");
const cors = require("cors");
//SOCKET.İO İÇİN GEREKLİ PAKETLER BUNLARI MESAJLAŞMA VE HESAP İŞLEMLERİ İÇİN KULLANACAĞIM
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const bodyParser = require("body-parser");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key", // Değiştirilebilir, güvenli bir anahtar kullanmalısınız
    resave: false,
    saveUninitialized: true,
  })
);
let users;
let posts;
let comments;
let postSayisi;
let sorgu;
let dVeri;
let userData;
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  // Kullanıcı bilgilerini PostgreSQL veritabanına kaydetme
  const query = {
    text: "INSERT INTO users (user_name, user_password,user_mail) VALUES($1, $2, $3)",
    values: [username, password, email],
  };

  db.query(query)
    .then(() => {
      res.status(201).send("Kullanıcı başarıyla kaydedildi.");
    })
    .catch((error) => {
      console.error("Kullanıcı kaydedilirken hata oluştu:", error);
      res.status(500).send("Kullanıcı kaydedilirken bir hata oluştu.");
    });
});
app.patch("/update-comment-display/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const newCommentDisplayValue = req.body.comment_display;

    // Veritabanında comment_display değerini güncelle
    const result = await db.query(
      "UPDATE postcomments SET comment_display = $1 WHERE comment_id = $2",
      [newCommentDisplayValue, commentId]
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "Comment display updated successfully.",
      });
    } else {
      res.status(404).json({ success: false, message: "Comment not found." });
    }
  } catch (error) {
    console.error("Error updating comment display:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/sendpost", (req, res) => {
  const { post_sender, post_content, post_datetime, post_title } = req.body;

  // Kullanıcı bilgilerini PostgreSQL veritabanına kaydetme
  const query = {
    text: "INSERT INTO posts (post_sender, post_content,post_datetime, post_title) VALUES($1, $2, $3, $4)",
    values: [post_sender, post_content, post_datetime, post_title],
  };

  db.query(query)
    .then(() => {
      res.status(201).send("post başarıyla kaydedildi.");
    })
    .catch((error) => {
      console.error("post kaydedilirken hata oluştu:", error);
      res.status(500).send("post kaydedilirken bir hata oluştu.");
    });
});

app.post("/sendcomment", (req, res) => {
  const {
    comment_sender,
    comment_content,
    comment_datetime,
    comment_postid,
    comment_type,
    comment_display,
  } = req.body;

  // Kullanıcı bilgilerini PostgreSQL veritabanına kaydetme
  const query = {
    text: "INSERT INTO postcomments (comment_sender, comment_content,comment_datetime,comment_postid,comment_type,comment_display) VALUES($1, $2, $3, $4, $5, $6)",
    values: [
      comment_sender,
      comment_content,
      comment_datetime,
      comment_postid,
      comment_type,
      comment_display,
    ],
  };

  db.query(query)
    .then(() => {
      res.status(201).send("comment başarıyla kaydedildi.");
    })
    .catch((error) => {
      console.error("comment kaydedilirken hata oluştu:", error);
      res.status(500).send("comment kaydedilirken bir hata oluştu.");
    });
});
app.delete("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await db.query("DELETE FROM users WHERE user_id = $1", [
      userId,
    ]);
    res.json({
      success: true,
      message: `User with user_id ${userId} deleted successfully`,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/updatecomment", (req, res) => {
  const { comment_sender, comment_content, comment_datetime, comment_postid } =
    req.body;

  // Kullanıcı bilgilerini PostgreSQL veritabanına kaydetme
  const query = {
    text: "INSERT INTO postcomments (comment_sender, comment_content,comment_datetime,comment_postid) VALUES($1, $2, $3, $4)",
    values: [comment_sender, comment_content, comment_datetime, comment_postid],
  };

  db.query(query)
    .then(() => {
      res.status(201).send("Kullanıcı başarıyla kaydedildi.");
    })
    .catch((error) => {
      console.error("Kullanıcı kaydedilirken hata oluştu:", error);
      res.status(500).send("Kullanıcı kaydedilirken bir hata oluştu.");
    });
});

app.post("/login", (req, res) => {
  const { user_mail, user_password } = req.body;
  console.log("user_mail: ", user_mail, "user_password: ", user_password);

  const query = {
    text: "SELECT user_id, user_name, user_mail, user_password, user_admin FROM users WHERE user_mail = $1 AND user_password = $2",
    values: [user_mail, user_password],
  };

  db.query(query)
    .then((result) => {
      const isUserAuthenticated = result.length > 0;

      if (isUserAuthenticated) {
        userData = {
          user_id: result[0].user_id,
          user_name: result[0].user_name,
          user_mail: result[0].user_mail,
          user_password: result[0].user_password,
          isAdmin: result[0].user_admin,
        };

        // Kontrol logları
        res.status(200).send(userData);
        req.session.user = userData;
        // Oturum açma sırasında oturum verilerini güncellemek için bir örnek
        // Oturum verileri güncellendikçe, /profile API'si her istendiğinde güncel verileri döndürür
      } else {
        res.status(401).send("Kullanıcı kimlik doğrulama hatası.");
      }
    })
    .catch((error) => {
      console.error(
        "Kullanıcı kimlik doğrulaması sırasında hata oluştu:",
        error
      );
      res
        .status(500)
        .send("Kullanıcı kimlik doğrulaması sırasında bir hata oluştu.");
    });
});
app.get("/profile", (req, res) => {
  console.log("userData:", userData);
  console.log(dVeri);

  if (userData) {
    console.log("userData:", userData);

    res.status(200).json(userData);
  } else {
    res.send("Oturum açmış bir kullanıcı bulunamadı.");
  }
});

app.get("/oturumu-kapat", (req, res) => {
  if (userData) {
    userData = null;
    // Oturumu sonlandırın
    req.session.destroy((error) => {
      if (error) {
        console.error("Oturumu sonlandırma sırasında bir hata oluştu:", error);
        res.status(500).send("Oturumu sonlandırma sırasında bir hata oluştu.");
      } else {
        res.status(200).send("Oturum başarıyla sonlandırıldı.");
      }
    });
  } else {
    res.status(200).send("Kullanıcı oturumu zaten kapalı.");
  }
});

app.get("/oturumu-kapat", (req, res) => {
  if (userData) {
    userData = null;
    // Oturumu sonlandırın
    console.log("selam");
    req.session.destroy((error) => {
      if (error) {
        console.error("Oturumu sonlandırma sırasında bir hata oluştu:", error);
        res.status(500).send("Oturumu sonlandırma sırasında bir hata oluştu.");
      } else {
        res.status(200).send("Oturum başarıyla sonlandırıldı.");
      }
    });
  } else {
    res.status(200).send("Kullanıcı oturumu zaten kapalı.");
  }
});

async function getData() {
  try {
    const data = await db.any(`SELECT * FROM users`);
    users = data;
  } catch (error) {
    console.log("Hata:", error);
  }
  try {
    const data = await db.any(
      `SELECT users.user_id, users.user_name, posts.post_id,posts.post_content,posts.post_datetime FROM users JOIN posts ON users.user_id = posts.post_sender`
    );

    postSayisi = data.length;
    posts = data;
  } catch (error) {
    console.log("Hata:", error);
  }
  try {
    const data = await db.any(`
    SELECT pc.*, u.user_name, p.post_title
    FROM postcomments pc
    JOIN users u ON pc.comment_sender = u.user_id
    JOIN posts p ON pc.comment_postid = p.post_id
    `);
    comments = data;
  } catch (error) {
    console.log("Hata:", error);
  }
  try {
    const data = await db.any(`SELECT
    postcomments.comment_id,
    postcomments.comment_content,
    postcomments.comment_sender,
    postcomments.comment_datetime,
    postcomments.comment_postid,
    postcomments.comment_display,
    users.user_id,
    users.user_name,
    users.user_mail,
    users.user_password,
    users.user_img,
    posts.post_id,
    posts.post_content,
    posts.post_sender,
    posts.post_datetime
FROM
    posts
LEFT JOIN
    postcomments ON posts.post_id = postcomments.comment_postid
LEFT JOIN
    users ON postcomments.comment_sender = users.user_id;

`);
    sorgu = data;
  } catch (error) {
    console.log("Hata:", error);
  }
}

async function main() {
  await getData();
}

main();

app.get("/api/users", (req, res) => {
  getData();
  res.json(users);
});

app.get("/api/postseski", (req, res) => {
  console.log("selambenposts");
  getData();
  res.json(posts);
});
app.get("/api/comments", (req, res) => {
  getData();
  res.json(comments);
});
app.get("/api/sorgu", (req, res) => {
  getData();
  res.json(sorgu);
});

app.patch("/api/comments/comment/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    const result = await db.query(
      "UPDATE postcomments SET comment_display = NOT comment_display WHERE comment_id = $1;",
      [commentId]
    );
    // Sadece bir comment beklediğimiz için ilk elemanı alıyoruz
  } catch (err) {
    console.error("Hata oluştu", err);
    res.status(500).send("Bir hata oluştu");
  }
});

app.get("/api/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const postData = await db.any(
      "SELECT posts.*, users.user_name FROM posts JOIN users ON posts.post_sender = users.user_id WHERE posts.post_id = $1",
      [postId]
    );

    if (postData.length > 0) {
      res.status(200).json(postData[0]);
    } else {
      res.status(404).json({ success: false, message: "Post not found." });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/comments/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await db.any(
      "SELECT postcomments.*, users.user_name FROM postcomments JOIN users ON postcomments.comment_sender = users.user_id WHERE postcomments.comment_postid = $1",
      [postId]
    );

    res.status(200).json({
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/profile/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const response = await db.any(
      "SELECT user_name, user_mail, user_img, user_admin, user_img, user_id from users WHERE user_name = $1",
      [username]
    );
    res.status(200).json(response[0]);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

app.get("/api/profile/posts/:username", async (req, res) => {
  const username = req.params.username;

  try {
    // PostgreSQL'den kullanıcıya ait postları çekme sorgusu
    const query = {
      text: "SELECT * FROM posts WHERE post_sender = (SELECT user_id FROM users WHERE user_name = $1)",
      values: [username],
    };

    // Sorguyu veritabanında çalıştırma
    const result = await db.query(query);

    // Başarılı yanıt gönderme
    res.json(result);
  } catch (error) {
    // Hata durumunda hata yanıtı gönderme
    console.error("Postlar alınırken bir hata oluştu:", error);
    res.status(500).json({ error: "Postlar alınırken bir hata oluştu" });
  }
});

app.get("/api/posts", async (req, res) => {
  const postId = req.params.postId;

  try {
    const postData = await db.any(
      "SELECT posts.*, users.user_id AS post_sender_id, users.user_name AS post_sender_name, JSON_AGG(JSON_BUILD_OBJECT('comment_content', postcomments.comment_content, 'comment_datetime', postcomments.comment_datetime, 'comment_sender_id', postcomments.comment_sender, 'comment_sender_name', comment_users.user_name)) AS comments FROM posts JOIN users ON posts.post_sender = users.user_id LEFT JOIN postcomments ON posts.post_id = postcomments.comment_postid LEFT JOIN users AS comment_users ON postcomments.comment_sender = comment_users.user_id GROUP BY posts.post_id, users.user_id"
    );

    if (postData.length > 0) {
      res.status(200).json(postData);
    } else {
      res.status(404).json({ success: false, message: "Post not found." });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/profiles", async (req, res) => {
  const userId = req;

  try {
    const data = await db.any(
      "SELECT users.user_name, string_agg(posts.post_content, ', ') AS post_content FROM users LEFT JOIN posts ON users.user_id = posts.post_sender GROUP BY users.user_name"
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/userscountinfo", async (req, res) => {
  try {
    const data = await db.any(
      "SELECT u.user_id, u.user_name, u.user_mail, u.user_admin, u.user_img, COALESCE(pc.comment_count, 0) AS comment_count, COALESCE(p.post_count, 0) AS post_count FROM users u LEFT JOIN (SELECT comment_sender, COUNT(*) AS comment_count FROM postcomments WHERE comment_display = false GROUP BY comment_sender) pc ON u.user_id = pc.comment_sender LEFT JOIN (SELECT post_sender, COUNT(*) AS post_count FROM posts GROUP BY post_sender) p ON u.user_id = p.post_sender;"
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/posts/blocked/filtered", async (req, res) => {
  try {
    const data = await db.any(
      "SELECT posts.*, users.user_name AS post_sender_name FROM posts LEFT JOIN users ON posts.post_sender = users.user_id WHERE posts.post_display = 'false';"
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching post:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error ha" });
  }
});

app.get("/api/comments/blocked/filtered", async (req, res) => {
  try {
    const data = await db.any(
      "SELECT postcomments.*, users.user_name AS comment_sender_name FROM postcomments LEFT JOIN users ON postcomments.comment_sender = users.user_id WHERE postcomments.comment_display = 'false';"
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching post:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error ha" });
  }
});
server.listen(port, () => {
  console.log(`API çalışıyor: http://localhost:${port}`);
});
