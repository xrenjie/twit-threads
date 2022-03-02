export class TweetObject {
  constructor(id, conversation_id, text, created_at, author_id, root) {
    this.id = id;
    this.conversation_id = conversation_id;
    this.text = text;
    this.created_at = created_at;
    this.author_id = author_id;
    this.root = root;
    this.replies = [];
  }

  addReply(tweet) {
    this.replies.push(tweet);
  }
}
