# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz
  before_action :load_question, except: :create

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
    if @question.update(quiz_question_params)
      render status: :ok, json: { notice: t("successfully_added", operation: "updated") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: t("deleted_successfully") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def quiz_question_params
      params.require(:mcq).permit(:question, options_attributes: [:id, :content, :answer, :_destroy])
    end

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end

    def load_question
      @question = @quiz.questions.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end
end
