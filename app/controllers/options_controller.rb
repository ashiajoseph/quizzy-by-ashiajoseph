# frozen_string_literal: true

class OptionsController < ApplicationController
  before_action :load_question, only: %i[create]

  def index
    @options = []
    params[:idList].each do |id|
      question = Question.find_by_id(id)
      @options.push(question.options)
    end
  end

  def create
    option = @question.options.create(option_params[:list])

    operation = option_params[:add] ? "added" : "updated"
    render status: :ok, json: { notice: t("successfully_added", operation: operation) }
  end

  private

    def option_params
      puts params
      params.require(:option).permit(:question_id, :add, list: [:content, :answer])
    end

    def load_question
      @question = Question.find_by(id: option_params[:question_id])
      unless @question
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end
end
