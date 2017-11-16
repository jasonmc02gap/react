class PostsChannel < ApplicationCable::Channel
  def follow
    stop_all_streams
    stream_from 'posts'
  end

  def unfollow
    stop_all_streams
  end
end