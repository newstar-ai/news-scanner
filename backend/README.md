## Backend services

**Install dependencies**

```bash
pip install -r requirements.txt
```

**Start flask-app**

```bash
flask run
```

**List of api**
[Go to this link](https://www.getpostman.com/collections/371e46d06ccba7418d17)

---

- /article/search/title: search các bài báo theo title
- /article/search/author: search các bài báo theo author
- /article/search/content: search các bài báo theo nội dung

---

- /article/update/{id}: update bài báo theo {id}
- /article/upload/{id}: upload bài báo theo {id} lên trên server
- /article/get/{id}: lấy thông tin 1 bài báo theo {id}

---

- /article/convert_text: chuyển ảnh 1 bài báo, chuyển thành title, content
