# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_quiz

  def create
    @question = @quiz.questions.new(question_params.except(:slug))
    unless @question.save
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:mcq).permit(:question, :slug)
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: question_params[:slug])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end
end
