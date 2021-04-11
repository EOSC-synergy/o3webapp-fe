import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

describe('AboutPage Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<About />);
        const wrapper = component.find('.AboutPageContainer');
        expect(wrapper.length).toBe(1);
    })
});