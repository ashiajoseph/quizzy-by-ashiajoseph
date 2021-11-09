# frozen_string_literal: true

class OptionsController < ApplicationController
  before_action :load_question

  def create
    option = @question.options.new(option_params)
    puts option
    unless option.save
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def option_params
      params.require(:option).permit(:content, :question_id, :answer)
    end

    def load_question
      @question = Question.find_by(id: option_params[:question_id])
      unless @question
        render status: :not_found, json: { error: "Question not found" }
      end
    end
end
