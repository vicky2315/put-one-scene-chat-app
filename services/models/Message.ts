import { Model } from '@nozbe/watermelondb';  // Fixed package name
import { field, children, relation } from '@nozbe/watermelondb/decorators'; 

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export default class Message extends Model {
  static table = 'messages';

  @field('content') content!: string;
  @field('sender_id') senderId!: string;
  @field('status') status!: MessageStatus;
  @field('created_at') createdAt!: Date;
  @relation('chats', 'chat_id') chat!: any; // We'll type this properly later
}