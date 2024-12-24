defmodule MyappWeb.PageLive do
  use MyappWeb, :live_view

  def pages do
    [
      %{
        title: "Hjem",
        content: """
                        Hei, og velkommen til e-portefølgen min! Jeg heter Markus og studere dataingeniør ved NTNU.
                        På denne nettsiden kan du utforske ulike erfaringer, prosjekter og annet jeg har jobbet med.

                        Naviger med piltastene eller skriv "h" for hjelp.
        """
      },
      %{
        title: "Erfaringer",
        content: """
        Erfaringer:

        Språk:
          C++: ★★★★☆
          Javascript/Typescript: ★★★★☆
          Java: ★★★★☆
          Elixir: ★★★☆☆
          Python: ★★★☆☆

        Teknologier:
          React: ★★★★☆
          Nextjs: ★★★★☆
          Tailwidcss: ★★★★☆
          Prisma: ★★★☆☆
          Phoenix: ★★★☆☆
          React Native (via expo): ★★☆☆☆


          Tips: Bruk erfaringer > [erfaring] for å se mer informasjon om en spesifikk erfaring.
        """,
        sub_pages: [
          %{
            title: "C++",
            content: """
            Jeg har brukt C++ mye i algoritmer og datastrukturer, og har tatt faget C++ for programmerere.

            For å se prosjekter jeg har laget med C++, skriv prosjekter > c++
            """
          },
          %{
            title: "Java",
            content: """
            Java har jeg, som regel, brukt i alle fagene på studiet. Dette inkluderer Programmering 1/2, systemutviklling og mer.
            Her har jeg jobbet via Maven, og utviklet prosjekter med blant annet javafx.

            For å se prosjekter jeg har laget med Java, skriv prosjekter > java
            """
          },
          %{
            title: "Javascript",
            content: """
            Javascript og Typescript har jeg brukt svært mye i hobbyprosjekter, særlig for å lage nettsider via nextjs eller vite. Nylig har jeg også vært med på å danne en komite for apputvikling i linjeforeningen, hvor vi bruker react native med expo.

            For å se prosjekter jeg har laget med Javascript, skriv prosjekter > javascript
            """
          },
          %{
            title: "Typescript",
            content: """
            Typescript og Javascript har jeg brukt svært mye i hobbyprosjekter, særlig for å lage nettsider via nextjs eller vite. Nylig har jeg også vært med på å danne en komite for apputvikling i linjeforeningen, hvor vi bruker react native med expo.

            For å se prosjekter jeg har laget med Typescript, skriv prosjekter > typescript
            """
          },
          %{
            title: "Elixir",
            content: """
            Elixir har jeg nettopp begynt å bruke for å lage realtime-nettsider med phoenix liveview.

            For å se prosjekter jeg har laget med Elixir, skriv prosjekter > elixir
            """
          },
          %{
            title: "Python",
            content: """
            Python har jeg brukt til å lage apier med Django og Flask, og diverse andre prosjekter som kantdeteksjon og web scraping.

            For å se prosjekter jeg har laget med Python, skriv prosjekter > python
            """
          }
        ]
      },
      %{
        title: "Prosjekter",
        content: """
        Et utvalg prosjekter jeg har jobbet med:

        C++:
            - Diverse programmer til algoritmer og datastrukturer
            - Spill med sfml

        Java:
           - Fraktalvisualisering med javafx
           - Mat-app med javafx
           - Toginformasjonsskjerm som terminalapplikasjon

        Javascript/Typescript:
           - App for linjeforeningen med react native
           - Sitatnettside med nextjs

        Elixir:
            - Denne nettsiden med phoenix liveview

        Du kan se mer informasjon om prosjekter i et språk ved å skrive prosjekter > [språk], eller ved å sjekke githuben min ved å skrive github.
        """
      },
      %{
        title: "Kontakt meg",
        content: """
        Kontakt via:

        Epost: markussmadsbakken@gmail.com
        Github: markussmadsbakken
        """
      }
    ]
  end

  def render_help_command() do
    Enum.map(commands(nil, nil), fn command ->
      "#{command.command} - #{command.description} \n"
    end)
  end

  def commands(socket, options) do
    [
      %{
        command: "h",
        description: "Viser denne meldingen",
        function: fn ->
          assign(socket, :page, %{
            title: socket.assigns.page.title,
            content: render_help_command()
          })
        end
      },
      %{
        command: "hjem",
        description: "Går til hjem-siden",
        function: fn ->
          page_num = Enum.find_index(pages(), fn page -> page.title == "Hjem" end)

          socket
          |> assign(:page, Enum.at(pages(), page_num))
          |> assign(:page_num, page_num)
        end
      },
      %{
        command: "erfaringer",
        description: "Går til erfaringer-siden",
        function: fn ->
          page_num = Enum.find_index(pages(), fn page -> page.title == "Erfaringer" end)

          socket
          |> assign(:page, Enum.at(pages(), page_num))
          |> assign(:page_num, page_num)
        end
      },
      %{
        command: "prosjekter",
        description: "Går til prosjekter-siden",
        function: fn ->
          page_num = Enum.find_index(pages(), fn page -> page.title == "Prosjekter" end)

          socket
          |> assign(:page, Enum.at(pages(), page_num))
          |> assign(:page_num, page_num)
        end
      },
      %{
        command: "kontakt",
        description: "Går til kontakt meg-siden",
        function: fn ->
          page_num = Enum.find_index(pages(), fn page -> page.title == "Kontakt meg" end)

          socket
          |> assign(:page, Enum.at(pages(), page_num))
          |> assign(:page_num, page_num)
        end
      },
      %{
        command: "github",
        description: "Åpner GitHub-profilen min",
        function: fn ->
          redirect(socket, external: "https://github.com/MarkussMadsbakken")
        end
      }
    ]
  end

  def mount(socket) do
    {:ok,
     socket
     |> assign(:page_num, 0)
     |> assign(:page, hd(pages()))
     |> assign(:page_titles, Enum.map(pages(), & &1.title))
     |> assign(:force_update, 0)
     |> assign(:page_title, "E-portefølje · Markus S Madsbakken")}
  end

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:page_num, 0)
     |> assign(:page, hd(pages()))
     |> assign(:page_titles, Enum.map(pages(), & &1.title))
     |> assign(:force_update, 0)
     |> assign(:page_title, "E-portefølje · Markus S Madsbakken")}
  end

  def handle_event("move", %{"key" => key}, socket) do
    right_keys = ["ArrowRight"]
    left_keys = ["ArrowLeft"]

    socket =
      cond do
        key in right_keys -> move_right(socket)
        key in left_keys -> move_left(socket)
        true -> socket
      end

    {:noreply, socket}
  end

  def handle_event("submit_command", %{"command" => command}, socket) do
    [command, options] =
      String.downcase(command)
      |> String.replace(" ", "")
      |> parse_command()

    found_command =
      Enum.find(commands(socket, options), fn it_command -> it_command.command == command end)

    socket =
      if found_command != nil do
        # command is found!

        if Enum.count(options) > 0 do
          # Command has options
          page_num =
            Enum.find_index(pages(), fn page ->
              String.downcase(page.title) == found_command.command
            end)

          if page_num != nil and Map.has_key?(Enum.at(pages(), page_num), :sub_pages) do
            # we have a page, render the sub page

            render_sub_page(socket, page_num, options)
          else
            # not implemented... yet...
            socket
            |> assign(:page, %{
              title: socket.assigns.page.title,
              content: "Command \"#{command}\" with options \"#{options}\" not found. \n"
            })
          end
        else
          # no options, run the funciton
          found_command.function.()
        end
      else
        # Command not found
        socket
        |> assign(:page, %{
          title: socket.assigns.page.title,
          content: "Command \"#{command}\" not found. \n"
        })
      end

    socket = assign(socket, :force_update, socket.assigns.force_update + 1)

    {:noreply, socket}
  end

  def handle_event("change_page", %{"title" => title}, socket) do
    page_num = Enum.find_index(pages(), fn page -> page.title == title end)

    {:noreply,
     socket
     |> assign(:page_num, page_num)
     |> assign(:page, Enum.at(pages(), page_num))}
  end

  def render_sub_page(socket, page_num, options) do
    if Enum.count(options) < 1 do
      throw("No options found! Bad!")
    end

    sub_page =
      Enum.at(pages(), page_num).sub_pages
      |> Enum.find(fn sub_page_it ->
        String.downcase(sub_page_it.title) == String.downcase(Enum.at(options, 0))
      end)

    if sub_page == nil do
      socket
      |> assign(:page, %{
        title: socket.assigns.page.title,
        content: "Option \"#{Enum.at(options, 0)}\" not found. \n"
      })
    else
      socket
      |> assign(:page_num, page_num)
      |> assign(:page, sub_page)
    end
  end

  def parse_command(command) do
    if not String.contains?(command, ">") do
      [command, []]
    else
      split_command = String.split(command, ">")
      [Enum.at(split_command, 0), Enum.drop(split_command, 1)]
    end
  end

  def move_left(socket) do
    new_page =
      if socket.assigns.page_num <= 0,
        do: 0,
        else: socket.assigns.page_num - 1

    socket
    |> assign(:page_num, new_page)
    |> assign(:page, Enum.at(pages(), new_page))
  end

  def move_right(socket) do
    new_page =
      if socket.assigns.page_num >= length(pages()) - 1,
        do: length(pages()) - 1,
        else: socket.assigns.page_num + 1

    socket
    |> assign(:page_num, new_page)
    |> assign(:page, Enum.at(pages(), new_page))
  end
end
