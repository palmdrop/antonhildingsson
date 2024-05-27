<script lang="ts">
  type NavPage = {
    label: string,
    href: string
  };

  const pages: NavPage[] = [
    {
      label: '↖',
      href: '/'
    },
    {
      label: 'work',
      href: '/work'
    },
    {
      label: '✉',
      href: '/contact'
    },
  ]
</script>

<nav>
  <ul>
    { #each pages as page (page.label)}
      <li>
        <a href={page.href} class="action">
          { page.label }
        </a>
      </li>
    { /each }
  </ul>
</nav>

<style>
  nav  {
    width: 100%;
  }

  ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  li {
    text-align: center;
    width: 100%;
  }

  li:first-of-type {
    text-align: left;
  }

  li:last-of-type {
    text-align: right;
  }

  a {
    font-style: italic;
  }
</style>
