# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit]
  before_action :load_quiz, only: %i[show update destroy]
  def index
    @quizzes = @current_user.quizzes.order("created_at DESC")
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
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: "Updated Successfully" }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: "Deleted Successfully" }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title)
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { error: "Quiz not found" }
      end
    end
end
