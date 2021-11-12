# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit]
  before_action :load_quiz, only: %i[show update destroy]
  def index
    @quizzes = @current_user.quizzes.order("created_at DESC").map do |quiz|
      { id: quiz[:id], title: quiz[:title] }
    end
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: t("successfully_created") }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
  end

  def update
    puts params
    if !quiz_params[:setslug] && @quiz.update(title: quiz_params[:title])
      render status: :ok, json: { notice: t("successfully_updated", entity: "Quiz") }
    elsif quiz_params[:setslug]
      slug_candidate = Quiz.set_slug(quiz_params[:title])
      @quiz.update(slug: slug_candidate)
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: t("deleted_successfully") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :setslug)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end
end
