# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit, :check_slug]
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
    if !quiz_params[:setslug]
      if @quiz.update(title: quiz_params[:title])
        render status: :ok, json: { notice: t("successfully_updated", entity: "Quiz") }
      else
        render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
      end
    else
      slug_candidate = Quiz.set_slug(quiz_params[:title])
      if @quiz.update(slug: slug_candidate)
        render status: :ok, json: { notice: t("publish") }
      else
        render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
      end

    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: t("deleted_successfully") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def check_slug
    quiz = Quiz.find_by(slug: params[:slug])
    @id = quiz ? quiz.id : nil
    @title = quiz ? quiz.title : nil
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
