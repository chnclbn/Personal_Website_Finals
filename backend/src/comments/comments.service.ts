import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://oukjcvftqmasquxoypbp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a2pjdmZ0cW1hc3F1eG95cGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTE1MDQsImV4cCI6MjA4NjM4NzUwNH0.iZT3dEZ8Iuuxgt1k_8L-xf9Mo7xJoYQ-bgrBz3OVPZ0'
);

@Injectable()
export class CommentsService {
  async getComments() {
    const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async postComment(body: { name: string; rating: number; comment: string }) {
    const { name, rating, comment } = body;
    if (!name || !comment || !rating) throw new BadRequestException('All fields required.');
    const { data, error } = await supabase.from('comments').insert([{ name, rating, comment }]).select();
    if (error) throw new BadRequestException(error.message);
    return data;
  }
}
