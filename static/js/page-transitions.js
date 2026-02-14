// Smooth Page Transitions - SPA-style Navigation
// This script intercepts navigation clicks and loads content via AJAX with smooth animations

(function () {
  'use strict'

  // Configuration
  const TRANSITION_DURATION = 400 // milliseconds
  const contentContainer = document.querySelector('main')
  const navLinks = document.querySelectorAll('a[href^="/"]')

  // Add transition styles to main content
  if (contentContainer) {
    contentContainer.style.transition = `opacity ${TRANSITION_DURATION}ms ease-in-out, transform ${TRANSITION_DURATION}ms ease-in-out`
  }

  // Function to load page content
  async function loadPage(url, pushState = true) {
    try {
      // Get the target path
      const targetPath = new URL(url, window.location.origin).pathname

      // UPDATE NAVIGATION IMMEDIATELY - before page loads
      if (typeof window.updateNavigationState === 'function') {
        window.updateNavigationState(targetPath)
      }

      // Fade out current content
      contentContainer.style.opacity = '0'
      contentContainer.style.transform = 'translateY(20px)'

      // Wait for fade out animation
      await new Promise((resolve) => setTimeout(resolve, TRANSITION_DURATION))

      // Fetch new page content
      const response = await fetch(url)
      if (!response.ok) throw new Error('Page not found')

      const html = await response.text()

      // Parse the HTML
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      // Extract main content
      const newContent = doc.querySelector('main')
      if (newContent) {
        contentContainer.innerHTML = newContent.innerHTML

        // Update page title
        const newTitle = doc.querySelector('title')
        if (newTitle) {
          document.title = newTitle.textContent
        }

        // Update browser history (this will update the actual URL)
        if (pushState) {
          window.history.pushState({ path: url }, '', url)
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' })

        // Re-initialize scroll reveal for new content
        initScrollReveal()

        // Fade in new content
        contentContainer.style.transform = 'translateY(0)'
        contentContainer.style.opacity = '1'

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu')
        const mobileMenuButton = document.getElementById('mobile-menu-button')
        const headerContainer = document.getElementById('header-container')

        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.remove('show')
          mobileMenu.classList.add('hide')
          if (headerContainer) {
            headerContainer.classList.remove('rounded-3xl')
            headerContainer.classList.add('rounded-full')
          }
          if (mobileMenuButton) {
            mobileMenuButton.classList.remove('active')
          }

          const menuIcon = mobileMenuButton?.querySelector('i')
          if (menuIcon) {
            menuIcon.classList.remove('fa-times')
            menuIcon.classList.add('fa-bars')
          }

          setTimeout(() => {
            mobileMenu.classList.add('hidden')
            mobileMenu.classList.remove('hide')
          }, 300)
        }
      }
    } catch (error) {
      console.error('Error loading page:', error)
      // Fallback to normal navigation
      window.location.href = url
    }
  }

  // Function to initialize scroll reveal for dynamically loaded content
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal')

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight
      revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top
        if (elementTop < windowHeight - 100) {
          el.classList.add('active')
        }
      })
    }

    // Remove old scroll listeners and add new one
    window.removeEventListener('scroll', revealOnScroll)
    window.addEventListener('scroll', revealOnScroll)
    revealOnScroll()
  }

  // Intercept navigation clicks
  function interceptNavigation() {
    document.addEventListener('click', (e) => {
      // Find the closest anchor tag
      const link = e.target.closest('a')

      // Check if it's an internal navigation link
      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.hasAttribute('target') &&
        !link.hasAttribute('download') &&
        !link.href.includes('#') &&
        link.pathname !== window.location.pathname
      ) {
        // Prevent default navigation
        e.preventDefault()

        // Load page with smooth transition
        loadPage(link.href)
      }
    })
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.path) {
      loadPage(e.state.path, false)
    } else {
      loadPage(window.location.href, false)
    }
  })

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    window.history.replaceState({ path: window.location.href }, '', window.location.href)

    // Intercept all navigation
    interceptNavigation()

    // Initial fade in
    if (contentContainer) {
      contentContainer.style.opacity = '1'
      contentContainer.style.transform = 'translateY(0)'
    }

    // Use the global updateNavigationState function
    if (typeof window.updateNavigationState === 'function') {
      window.updateNavigationState()
    }

    // Initialize scroll reveal for initial page load
    initScrollReveal()
  })
})()