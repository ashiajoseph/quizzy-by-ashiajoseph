# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: %i[new edit check_slug]
  before_action :load_quiz, only: %i[show update destroy]
  def index
    @quizzes = @current_user.quizzes.order("created_at DESC").as_json(only: %i[id title ])
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

  def generate_report
    quizzes = @current_user.quizzes.order("created_at DESC")
    @content = false
    if quizzes.size != 0
      published_quiz_present = quizzes.all? { |quiz| quiz.slug != nil }
      if published_quiz_present
        quizlist = quizzes.includes(:attempts, attempts: [:user])
        @report = [ ]
        @content = true
        quizlist.each do |quiz|
          quiz.attempts.each do |attempt|
            if attempt.submitted
              full_name = attempt.user.first_name + " " + attempt.user.last_name
              @report << {
                title: quiz.title, user_name: full_name, email: attempt.user.email,
                correct_count: attempt.correct_answers_count, incorrect_count: attempt.incorrect_answers_count
              }
            end
          end
        end
      else
        render status: :not_found, json: { error: t("no_quiz", entity: "published") }
      end
    else
      render status: :not_found, json: { error: t("no_quiz", entity: "created") }
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
