<template>
    <teleport to="body">
    <div
      ref = 'formModal'
      class = 'wrapper-form-modal'
      @click = 'onCancel'
    >
    </div>
    </teleport>

      <transition
        appear
        name = 'form-modal'
      >
        <div class = 'form-modal'>
          <div class='header'>
            <div class="full-name">
              {{ fullName }}
            </div>
            <div class="email">
              {{ email }}
            </div>
          </div>
          <div class="body">
            <DrawerItem
              title = 'Головна'
              @click = 'onGoHome'
            >
              <HomeIco />
            </DrawerItem>

            <DrawerItem
              title = 'Мої дані'
              @click = 'onGoAccount'
            >
              <AccountIco />
            </DrawerItem>

            <DrawerItem
              title = 'Зміна паролю'
              @click = 'onGoChangePassword'
            >
              <ChangePasswordIco />
            </DrawerItem>

            <DrawerItem
              title = 'Вихід'
              @click = 'onSignOut'
            >
              <SignOutIco />
            </DrawerItem>

          </div>
        </div>
      </transition>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import DrawerItem from '@/components/Drawer/DrawerItem';
import HomeIco from '@/assets/images/home.svg';
import AccountIco from '@/assets/images/address-card.svg';
import ChangePasswordIco from '@/assets/images/key.svg';
import SignOutIco from '@/assets/images/sign-out.svg';

import { authSignOut } from '@/api/auth';
import { apiGetUser } from '@/api/user';

export default {
  name: 'Drwaer',
  components: {
    DrawerItem,
    HomeIco,
    AccountIco,
    ChangePasswordIco,
    SignOutIco
  },
  setup(_, { emit }) {
    const router = useRouter();
    const email = ref('');
    const fullName = ref('');

    (async () => {
      const user = await apiGetUser();
      email.value = user.email;
      fullName.value = `${user.lastName} ${user.firstName}`;
    })();

    onMounted(() => document.body.classList.add('body-drawer-open'));
    onUnmounted(() => document.body.classList.remove('body-drawer-open'));

    const onSignOut = async () => {
      try {
        await authSignOut();
        router.push({ name: 'SignIn' });
      } catch (err) {
        console.log(err)
      }
    };

    const onCancel = () => emit('cancel');

    const onGoHome = () => {
      onCancel();
      router.push({ name: 'Home' });
    }

    const onGoAccount = () => {
      onCancel();
      router.push({ name: 'Account' });
    }

    const onGoChangePassword = () => {
      onCancel();
      router.push({ name: 'ChangePassword' });
    }

    return {
      email,
      fullName,
      onCancel,
      onGoHome,
      onGoAccount,
      onGoChangePassword,
      onSignOut
    }
  }
};
</script>

<style >
.body-drawer-open {
  overflow: hidden;
}
</style>

<style scoped>


.header {
  padding: 12px 16px;
  border-bottom:  1px solid rgba(0,0,0,.12);

}

.body {
  padding: 8px;
}

.full-name {
      font-size: 2rem;
    margin-bottom: 3px;
    font-weight: 500;
    letter-spacing: .0125em!important;
}

.email {
  color: #757575;
  font-size: 1.4rem;
}

/* transition */
.form-modal-enter-to,
.form-modal-leave-from {
  transform: translateX(0);

}

.form-modal-enter-from,
.form-modal-leave-to {
  transform: translateX(100%);

}

.form-modal-enter-active,
.form-modal-leave-active {
  transition: transform .75s ease-in-out;
}

/* ********************* */
.wrapper-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(33, 33, 33, .46);
}

.form-modal {
  font-family: Roboto;
  z-index: 2;
  position: absolute;
  right: 0;
  top: 0;
  max-width: calc(100% - 40px);
  min-width: 240px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  word-break: break-word;
  hyphens: auto;
  background-color: white;
  border-radius: .2rem;
  box-shadow:
    0 1.1rem 1.5rem -.7rem rgba(0, 0, 0, .2),
    0 2.4rem 3.8rem .3rem rgba(0, 0, 0, .14),
    0 .9rem 4.6rem .8rem rgba(0, 0, 0, .12);
}

.form-modal {
}

.modal-header {
  margin: 0;
  padding: 1.6rem;
  font-weight: normal;
  font-size: 2.4rem;
  text-align: left;
}

.modal-btn-close {
  position: relative;
  float: right;
  margin: -1.6rem -1.6rem 0 0;
  padding: 1.4rem;
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 1;
  color: rgba(0, 0, 0, .5);
  text-shadow: 0 .1rem 0 #fff;
  background-color: transparent;
  border: 0;
  border-radius: .2rem;
  outline: none;
  cursor: pointer;
}

.modal-btn-close::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: currentColor;
  border-radius: inherit;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.25, .8, .5, 1);
  pointer-events: none;
  will-change: opacity;
}

.modal-btn-close:hover::before,
.modal-btn-close:focus::before {
  opacity: .12;
}

.modal-body {
  padding: 1.6rem;
  font-size: 1.6rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1.6rem;
}
</style>
