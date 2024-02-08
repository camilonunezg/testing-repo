import { Component } from 'vue';
import { cleanup, render, screen } from '@testing-library/vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import CoursesTablesVue from '@/courses/presentation/ui/views/CoursesTables.vue';

const customRender = (component: Component) => {
  render(component, {
    global: {
      plugins: [VueQueryPlugin],
    },
  });
}

describe('Given a courses table', () => {

  afterEach(() => {
    cleanup()
  })

  describe('When the component is rendered and table is loading', () => {
    it('Then, the user should see a loading message', () => {
      customRender(CoursesTablesVue)
      const loadingMessage = screen.getByText(/Loading.../i)
      expect(loadingMessage).toBeTruthy()
    })

    it('Then, the user should not see a table caption', () => {
      customRender(CoursesTablesVue)
      const tableCaption = screen.queryByText(/A list of your recent courses./i)
      expect(tableCaption).toBeFalsy()
    })

    it('Then, the user should not see an error message', () => {
      customRender(CoursesTablesVue)
      const errorMessage = screen.queryByText(/An error occurred when retrieving courses./i)
      expect(errorMessage).toBeFalsy()
    })
  })

  describe('When the component is rendered and table is not loading', () => {
    it('Then, the user should see a table caption', async () => {
      customRender(CoursesTablesVue)
      const tableCaption = await screen.findByText(/A list of your recent courses./i)
      expect(tableCaption).toBeTruthy()
    })

    it('Then, the user should see the table headers', async () => {
      customRender(CoursesTablesVue)
      const tableHeader1 = await screen.findByText(/Course ID/i)
      expect(tableHeader1).toBeTruthy()

      const tableHeader2 = await screen.findByText(/Title/i)
      expect(tableHeader2).toBeTruthy()

      const tableHeader3 = await screen.findByText(/Image url/i)
      expect(tableHeader3).toBeTruthy()
    })
  })
})
