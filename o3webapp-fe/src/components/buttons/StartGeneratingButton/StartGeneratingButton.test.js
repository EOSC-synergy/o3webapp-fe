import React from 'react';
import { shallow } from 'enzyme';
import StartGeneratingButton from './StartGeneratingButton';

describe('StartGeneratingButton Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<StartGeneratingButton />);
        const wrapper = component.find('.startButton');
        expect(wrapper.length).toBe(1);
    })
});