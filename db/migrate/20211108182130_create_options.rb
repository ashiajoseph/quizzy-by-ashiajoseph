# frozen_string_literal: true

class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.text :content, null: false
      t.boolean :answer, null: false, default: false
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
