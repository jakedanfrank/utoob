class AddIframeToVideos < ActiveRecord::Migration[5.2]
  def change
    add_column :videos, :iframe, :text
  end
end
