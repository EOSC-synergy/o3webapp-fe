import React from 'react';
import { shallow } from 'enzyme';
import ModelButton from './ModelButton';

describe('ModelButton Component', () => {
    it('It should render without errors', () => {
        const component = shallow(<ModelButton title={"model-title"} handleModelClick={() => {}} selected={true} />);
        const wrapper = component.find('.model-button-title-wrapper');
        expect(wrapper.length).toBe(1);
    })
    describe('selected prop should work correctly', () => {
        it('selected props should be active', () => {
            const component = shallow(<ModelButton title={"model-title"} handleModelClick={() => {}} selected={true} />);
            const wrapper = component.find('MdCheckBox');
            expect(wrapper.length).toBe(1);
        })
        it('selected props should be inactive', () => {
            const component = shallow(<ModelButton title={"model-title"} handleModelClick={() => {}} selected={false} />);
            const wrapper = component.find('MdCheckBoxOutlineBlank');
            expect(wrapper.length).toBe(1);
        })
    })


    it('renders the correct title', () => {
        const component = shallow(<ModelButton title={"model-title"} handleModelClick={() => {}} selected={true} />);
        const wrapper = component.find('.model-button-label');
        expect(wrapper.text()).toBe('model-title');
    })
    it('more info button works correctly', () => {
        const component = shallow(<ModelButton title={"model-title"} handleModelClick={() => {}} selected={true} />);
        // const checkBox = component.find('MdCheckBox');
        // expect(checkBox.length).toBe(1);
        expect(component.state('opened')).toBe(false);
        const button = component.find('.more-info-button');
        button.simulate('click');
        // const checkBoxUnchecked = component.find('MdCheckBoxOutlineBlank');
        // expect(checkBoxUnchecked.length).toBe(1);
        expect(component.state('opened')).toBe(true);
    })
})