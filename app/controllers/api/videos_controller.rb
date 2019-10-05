class Api::VideosController < ApplicationController
    before_action :set_user
    before_action :set_video, only: [:show, :update, :destroy]
  
  def index
    render json: @user.videos.all 
  end

  def show
    render json: @user.video
  end

  def create
    video = @user.video.new(video_params)
        if @user.video.save
            render json: @user.video
        else  
            render json: @user.video.errors, status: 422
      end
  end

  def update
    if @user.video.update(video_params)
        render json: @user.video
    else
        render json: @user.video.errors, status: 422
    end
  end

  def destroy
    @user.video.destroy
  end

  private 

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_video
    @video = Video.find(params[:id])
  end

  def video_params
    params.require(:video).permit(:title, :duration, :genre, :description, :trailer, :iframe)
  end
end
