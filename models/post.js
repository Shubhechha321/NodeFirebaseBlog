class Post {
  constructor(
    id,
    userId,
    title,
    slug,
    author,
    createdOn,
    updatedOn,
    content,
    status
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.slug = slug;
    this.author = author;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
    this.content = content;
    this.status = status;
  }
}

module.exports = Post;
