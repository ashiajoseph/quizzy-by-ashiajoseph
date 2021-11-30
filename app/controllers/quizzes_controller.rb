# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: %i[check_slug]
  before_action :load_quiz, except: %i[index create check_slug]

  def index
    @quizzes = @current_user.quizzes.order("created_at DESC")
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    authorize quiz
    if quiz.save
      render status: :ok, json: { notice: t("successfully_created") }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def show
    authorize @quiz
    @questions = @quiz.questions
  end

  def update
    authorize @quiz
    if @quiz.update(title: quiz_params[:title])
      render status: :ok, json: { notice: t("successfully_updated", entity: "Quiz") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    authorize @quiz
    if @quiz.destroy
      render status: :ok, json: { notice: t("deleted_successfully") }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def retrieve_title
    authorize @quiz
  end

  def publish
    authorize @quiz
    slug_candidate = @quiz.set_slug()
    if @quiz.save
      render status: :ok, json: { notice: t("publish"), slug: slug_candidate }
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def check_slug
    @quiz = Quiz.find_by(slug: params[:id])
    unless @quiz
      render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end
end
