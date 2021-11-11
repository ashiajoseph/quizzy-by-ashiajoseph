# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_quiz, only: :create
  before_action :load_question, only: %i[show update destroy]

  def index
    quiz = Quiz.find_by(slug: params[:slug])
    @questions = quiz.questions
  end

  def create
    @question = @quiz.questions.new(quiz_question_params.except(:slug))
    unless @question.save
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def show
  end

  def update
    if @question.update(questions_params)
      @question.options.delete_all
    else
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: t("deleted_successfully") }
    else
      render status: :unprocessable_entity,
        json: { error: @task.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_question_params
      params.require(:mcq).permit(:question, :slug)
    end

    def questions_params
      params.require(:mcq).permit(:question)
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: quiz_question_params[:slug])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end

    def load_question
      @question = Question.find_by(id: params[:id])
      @options = @question.options
      unless @question
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end
end
