# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: [:index, :create]

  def index
    @quizzes = @current_user.quizzes
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: "Quiz created successfully" }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    @quiz = Quiz.find_by(slug: params[:slug])
    unless @quiz
      render status: :not_found, json: { error: "Quiz not found" }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title)
    end
end
