# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:new, :edit]
  before_action :load_quiz, only: :create
  before_action :load_question, only: %i[show update destroy]

  def index
    quiz = Quiz.find_by(id: params[:quizid])
    @questions = quiz.questions.includes(:options)
    @options = []
    @questions.each do |question|
      @options.push(question.options.as_json(only: %i[id content answer]))
    end
  end

  def create
    @question = @quiz.questions.new(quiz_question_params)
    if @question.save
      render status: :ok, json: { notice: t("successfully_added", operation: "added") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def show
    @options = @question.options
  end

  def update
    if @question.update(questions_params)
      @question.options.delete_all
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
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
      params.require(:mcq).permit(:question, :quiz_id, options_attributes: [:content, :answer])
    end

    def questions_params
      params.require(:mcq).permit(:question)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: quiz_question_params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end
end
