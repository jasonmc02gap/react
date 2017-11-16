class PostsJob < ApplicationJob
  def perform
    ActionCable.server.broadcast 'posts', posts: Post.all
  end
end