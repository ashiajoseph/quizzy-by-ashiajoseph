# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :load_attempt, only: :update
  def index
    quiz = Quiz.find_by(id: params[:quizid])
    @questions = quiz.questions
    @options = []
    @questions.each do |question|
      array = []
      question.options.each do |option|
        id, content = option.values_at(:id, :content)
        filtered_option = {
          id: id, content: content
        }
        array.push(filtered_option)
      end
      @options.push(array)
    end
  end

  def update
    unless @attempt.update({ submitted: true })
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  private

    def load_attempt
      @attempt = Attempt.find_by(id: params[:id])
      unless @attempt
        render status: :not_found, json: { error: t("not_found", entity: "Attempt") }
      end
    end
end
