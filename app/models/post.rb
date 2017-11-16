class Post < ApplicationRecord

  after_commit { PostsJob.perform_later }

end
