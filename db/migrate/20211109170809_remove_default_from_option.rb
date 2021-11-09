# frozen_string_literal: true

class RemoveDefaultFromOption < ActiveRecord::Migration[6.1]
  def change
    change_column_default(:options, :answer, nil)
  end
end
