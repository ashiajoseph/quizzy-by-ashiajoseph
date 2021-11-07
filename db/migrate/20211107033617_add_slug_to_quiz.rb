# frozen_string_literal: true

class AddSlugToQuiz < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :slug, :string, null: false, index: { unique: true }
  end
end
