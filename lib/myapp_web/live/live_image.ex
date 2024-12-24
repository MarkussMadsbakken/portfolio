defmodule MyappWeb.LiveImage do
  alias MyappWeb.LiveImage
  use MyappWeb, :live_component

  def render(assigns) do
    ~H"""
        <div class="w-fit h-fit whitespace-pre text-[4px] leading-[0.15em] [&>*]:left-0 " phx-update="stream" id={@src}>
            <div :for={{id, line} <- @streams.lines} id={id}>
                <%= line.line %>
            </div>
        </div>
    """
  end

  def mount(socket) do
    {:ok, socket |> stream(:lines, [])}
  end

  def update(%{new_line: new_line} = assigns, socket) do
    {:ok,
     socket
     |> assign(assigns)
     |> stream_insert(:lines, new_line)}
  end

  def update(assigns, socket) do
    socket = assign(socket, :src, assigns.src)
    socket = stream(socket, :lines, [])
    pid = self()

    Task.start(fn ->
      stream_ascii(assigns.src, 25, assigns.id, pid)
    end)

    {:ok, socket}
  end

  def stream_ascii(path, size, id, pid) do
    case File.read(path) do
      {:ok, bin} ->
        case Image.from_binary(bin) do
          {:ok, image} ->
            convert_to_ascii(image, size, id, pid)

          {:error, reason} ->
            IO.puts("Failed to load image: #{reason}")
            :error
        end

      {:error, reason} ->
        IO.puts("Failed to read file: #{reason}")
        :error
    end
  end

  def convert_to_ascii(raw_image, size, id, pid) do
    chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`"

    {:ok, thumb_image} = Image.thumbnail(raw_image, size)
    {:ok, image} = Image.contrast(thumb_image, 1.5)

    for y <- 0..(Image.height(image) - 1) do
      line =
        for x <- 0..(Image.width(image) - 1), into: "" do
          {:ok, color} = Image.get_pixel(image, x, y)
          brightness = get_brightness(color)
          char_index = round(brightness * (String.length(chars) - 1))
          char = String.at(chars, char_index)
          char
        end

      send_update(pid, LiveImage, id: id, new_line: %{id: y, line: line})
    end
  end

  defp get_brightness([r, g, b]) do
    0.299 * (r / 255) + 0.587 * (g / 255) + 0.114 * (b / 255)
  end
end
