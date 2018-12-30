import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import Checkout from '@/views/Checkout.vue';
import CreditCardForm from '@/components/CreditCardForm.vue';

describe('Checkout.vue', () => {
  it('has add-cc button', () => {
    const wrapper = shallowMount(Checkout);
    expect(wrapper.find('.add-cc-button').exists()).to.be.true;
  });

  it('cc form opens after button click', () => {
    const wrapper = shallowMount(Checkout);
    expect(wrapper.find(CreditCardForm).exists()).to.be.false;
    wrapper.find('.add-cc-button').trigger('click');
    expect(wrapper.find(CreditCardForm).exists()).to.be.true;
  });

  it('save button disabled when cc form empty', () => {
    const checkout = mount(Checkout);
    checkout.find('.add-cc-button').trigger('click');
    checkout.find('.save').trigger('click');
    expect(checkout.find(CreditCardForm).exists()).to.be.true;
  });

  it('save button disabled when cc data invalid', () => {
    const checkout = mount(Checkout);
    checkout.find('.add-cc-button').trigger('click');
    expect(checkout.find(CreditCardForm).exists()).to.be.true;
    checkout.find('#cc-number').setValue('1234555555554444');
    checkout.find('#cc-name').setValue('Martin Klein');
    checkout.find('#cc-expiry').setValue('06/17');
    checkout.find('#cc-cvv').setValue('123');
    checkout.find('.save').trigger('click');
    expect(checkout.find(CreditCardForm).exists()).to.be.true;
  });

  it('no new cc added when cc data invalid', () => {
    const checkout = mount(Checkout);
    const slidesBefore = checkout.findAll('.swiper-item').length;
    checkout.find('.add-cc-button').trigger('click');
    checkout.find('#cc-number').setValue('1234555555554444');
    checkout.find('#cc-name').setValue('Martin Klein');
    checkout.find('#cc-expiry').setValue('06/17');
    checkout.find('#cc-cvv').setValue('123');
    checkout.find('.save').trigger('click');
    const slidesAfter = checkout.findAll('.swiper-item').length;
    expect(slidesAfter).to.be.equal(slidesBefore);
  });

  it('saving valid cc data', () => {
    const checkout = mount(Checkout);
    const slidesBefore = checkout.findAll('.swiper-item').length;
    checkout.find('.add-cc-button').trigger('click');
    expect(checkout.find(CreditCardForm).exists()).to.be.true;
    checkout.find('#cc-number').setValue('5555555555554444');
    checkout.find('#cc-name').setValue('Martin Klein');
    checkout.find('#cc-expiry').setValue('06/23');
    checkout.find('#cc-cvv').setValue('123');
    checkout.find('.save').trigger('click');
    const slidesAfter = checkout.findAll('.swiper-item').length;
    expect(checkout.find(CreditCardForm).exists()).to.be.false;
    expect(slidesAfter).to.be.above(slidesBefore);
  });
});
