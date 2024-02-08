import { Component } from 'vue';
import { render, screen } from '@testing-library/vue';
import CourseTitleVue from '@/courses/presentation/ui/components/CourseTitle.vue';

describe('Given a course title', () => {

  const customRender = (component: Component, message: string) => {
    render(component, {
      props: {
        title: message,
      }
    });
  }

  describe('When the component is rendered', () => {
    it('Then, the user should see a Medication info like a legend', () => {
      customRender(CourseTitleVue, 'Web Wizards')
      const titleMessage = screen.getByText(/Web Wizards/i)
      expect(titleMessage).toBeTruthy()
    })

    it('Then, the user should see a Medication info like a legend', () => {
      customRender(CourseTitleVue, 'Testing title')
      const titleMessage = screen.getByText(/Testing title/i)
      expect(titleMessage).toBeTruthy()
    })
  })
})
