import React from 'react';
import { shallow } from 'enzyme';
import ModelController from './ModelController';

describe('ModelController Component', () => {
    it('should render without crashing', () => {
        const component = shallow(<ModelController handleChange={() => {}} availableModels={["model1"]} selectedModels={["model1"]} />);
        const wrapper = component.find('.model-section-wrapper');
        expect(wrapper.length).toBe(1);
    })
    it('should save search term in state', () => {
        const component = shallow(<ModelController handleChange={() => {}} availableModels={["model1", "model2"]} selectedModels={["model1"]} />);
        const input = component.find('input');
        input.simulate('change', { target: { value: 'model2'}})
        expect(component.state('searchTerm')).toBe('model2');
    })
    it('should only render filtered models', () => {
        const component = shallow(<ModelController handleChange={() => {}} availableModels={["model1", "model2"]} selectedModels={["model1"]} />);
        const model = component.find('ModelButton');
        expect(model.length).toBe(2);
        const input = component.find('input');
        input.simulate('change', { target: { value: 'model2'}})
        const model2 = component.find('ModelButton');
        expect(model2.length).toBe(1);
    })
    it('should show models again if filter is removed', () => {
        const component = shallow(<ModelController handleChange={() => {}} availableModels={["model1", "model2"]} selectedModels={["model1"]} />);
        const model = component.find('ModelButton');
        expect(model.length).toBe(2);
        const input = component.find('input');
        input.simulate('change', { target: { value: 'model2'}})
        const model2 = component.find('ModelButton');
        expect(model2.length).toBe(1);
        input.simulate('change', { target: { value: ''}})
        const model3 = component.find('ModelButton');
        expect(model3.length).toBe(2);
    })
});