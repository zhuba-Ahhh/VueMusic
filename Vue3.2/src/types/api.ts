export interface sId {
  type: [Number, String];
}
export interface infoType {
  msg?: string;
  maxLen?: number;
  curId?: [Number, String];
  limit?: number;
  offset?: number;
  before?: number;
  hotComments?: [];
  comments?: [];
  total?: number;
  currentPage?: number;
  isEmpty?: false;
  replyCommentId?: number;
  replyIndex?: number;
  avatarUrl?: string;
  nickname?: string;
}
