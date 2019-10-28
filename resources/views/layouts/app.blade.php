<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')

  <body @php body_class() @endphp>
    @php wp_body_open() @endphp
    @php do_action('get_header') @endphp
    @include('partials.header')

    <div id="app">
      <div class="content">
        <main class="main">
          @yield('content')
        </main>

        @hasSection('sidebar')
          <aside class="sidebar">
            @yield('sidebar')
          </aside>
        @endif
      </div>
    </div>

    @php do_action('get_footer') @endphp
    @include('partials.footer')

    @php wp_footer() @endphp
  </body>
</html>
