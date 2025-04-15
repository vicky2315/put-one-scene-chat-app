import { Model } from '@nozbe/watermelondb';  // Fixed package name
import { field, children } from '@nozbe/watermelondb/decorators';  // Fixed path
import Message from './Message';

export default class Chat extends Model {
  static table = 'chats';  // Table name in database

  @field('name') name!: string;  // Column definition
  
  @field('last_message') 
  lastMessage!: string;  // Correct decorator syntax

  @children('messages') 
  messages!: Message[];  // Typed relation to Message model
}