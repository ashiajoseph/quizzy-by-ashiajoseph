# frozen_string_literal: true

class OptionsController < ApplicationController
  before_action :load_question, only: %i[create]

  def create
    option_params[:list].each do |option|
      opt = @question.options.new(option)
      unless opt.save
        render status: :unprocessable_entity, json: { error: opt.errors.full_messages.to_sentence }
        return
      end
    end
    render status: :ok, json: { notice: t("successfully_added", operation: "updated") }
  end

  private

    def option_params
      params.require(:option).permit(:question_id, list: [:content, :answer])
    end

    def load_question
      @question = Question.find_by(id: option_params[:question_id])
      unless @question
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end
end
