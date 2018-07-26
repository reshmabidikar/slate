# Unique header generation
require 'middleman-core/renderers/redcarpet'
class UniqueHeadCounter < Middleman::Renderers::MiddlemanRedcarpetHTML
  def initialize
    super
    @head_count = {}
    @first_header_level = ''
  end
  def header(text, header_level)
    friendly_text = text.parameterize

    # append level 1 header to the friendly text; this will prevent duplicate
    # links when multiple separate files are rendered
    @first_header_level = friendly_text if header_level == 1
    friendly_text = "#{@first_header_level}-#{friendly_text}" if header_level > 1

    @head_count[friendly_text] ||= 0
    @head_count[friendly_text] += 1
    if @head_count[friendly_text] > 1
      friendly_text += "-#{@head_count[friendly_text]}"
    end
    return "<h#{header_level} id='#{friendly_text}'>#{text}</h#{header_level}>"
  end
end
