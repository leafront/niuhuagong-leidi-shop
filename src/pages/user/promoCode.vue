<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper assets-view" :class="{'visibility':!pageView}">
      <div class="asset_view_bg"></div>
      <div class="asset_info">
        <div class="asset_info_icon">
          <svg class="ico icon_jinbi"  aria-hidden="true">
            <use xlink:href="#icon-jinbi"></use>
          </svg>
        </div>
          <div v-if="my_code && user_code">
            <h5>工匠优惠码<br><div style="font-size: .22rem">(工匠自用，商品直减)</div></h5>
            <p><b>{{ my_code }}</b></p>
            <div id="clientCode">
              <h5>客户优惠码<br><div style="font-size: .22rem">(客户使用，工匠返现)</div></h5>
              <p><b>{{ user_code }}</b></p>
            </div>
          </div>
        <div v-else class="tishi" >功能内测中,如想体验请联系:<br><br>021-58786128</div>
      </div>
    </div>
        <AppFooter/>
  </div>
</template>


<script>

  import AppHeader from '@/components/common/header'
  import AppFooter from '@/components/common/footer'
  
  import { mapActions, mapGetters } from 'vuex'

  import * as Model from '@/model/user'

  export default {

    components: {
      AppHeader,
      AppFooter
    },

    data () {
      return {

        title: '优惠码',
        my_code: '',
        user_code: ''
      }
    },
    mixin: ['loading'],
    computed: {

      ...mapGetters({
        'pageView': 'getPageView'

      })
    },

    beforeCreate () {

      document.title = '优惠码'

    },

    created () {

      this.updatePageView(false)

      // this.getUserAssets()
      this.getPromoCode();

      this.showLoading()

    },

    methods: {

      ...mapActions([
        'updatePageView'
      ]),

      backFn () {

        this.pageAction('/user/center')

      },

      pageAction (url) {

        this.$router.push(url)

      },

      /**
       *
       * 获取用户当前金额
       */

      // getUserAssets () {
      //
      //   Model.getUserAssets({
      //     type: 'GET'
      //   }).then((res) => {
      //
      //     this.updatePageView(true)
      //     this.$hideLoading()
      //
      //     const data = res.data
      //
      //     if (res.status >= 1) {
      //
      //       this.price = data.cash
      //
      //     } else {
      //
      //       this.$toast(res.msg)
      //
      //     }
      //
      //   })
      //
      // }
      getPromoCode(){

        Model.getPromoCode({
          type: 'GET'
        }).then((res) => {
          this.updatePageView(true)
          this.$hideLoading()
          const data = res.data
          if(res.status == 1){
            for (var i=0;i<=1;i++)
            {
              if(data[i].use_type == 1){
                this.my_code = data[i].discount_code
              }
              if(data[i].use_type == 2){
                this.user_code = data[i].discount_code
              }
            }

          }
          else{
            this.code='优惠码获取失败,请稍后再试';
          }

        })
      }
    }

  }

</script>

<style lang="scss">


  .asset_info{

    width:90%;

    height: 5.3rem;

    background: #33b9ff;

    position:absolute;

    left: 50%;

    top: 1rem;

    transform: translateX(-50%);

    text-align: center;

    h5{

      font-size: .32rem;

      color: #fff;

      padding-bottom: .75rem;
    }
    p{
      color: #fff;

      b{

        font-weight: bold;
        font-size: .8rem;
      }
    }

  }

  .asset_info{

    width:90%;

    height: 5.3rem;

    background: #33b9ff;

    position:absolute;

    left: 50%;

    top: 1rem;

    transform: translateX(-50%);

    text-align: center;

    h5{

      font-size: .32rem;

      color: #fff;

      padding-bottom: .75rem;
    }
    p{
      color: #fff;

      i{
        font-size: .36rem;

        position: relative;

        top: -0.3rem;

      }
      b{

        font-weight: bold;
        font-size: .8rem;
      }
    }

  }

  .asset_info_icon{

    width: 1.86rem;

    height: 1.86rem;

    background: #0287cc;

    position: relative;

    left: 50%;

    top:0;

    transform: translate(-50%,-50%);

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    .icon_jinbi{

      color:#fff;

      width: .85rem;
      height: .85rem;

    }

  }

  .assets-view{

    background: #fff;

  }

  .asset_view_bg{

    background: #1ba0e5;

    height: 4.78rem;

  }

  #clientCode{
    margin-top: 180px;
    h5{

      font-size: .32rem;

      color: #33b9ff;

      padding-bottom: .75rem;
    }
    p{
      color: #33b9ff;

      i{
        font-size: .36rem;

        position: relative;

        top: -0.3rem;

      }
      b{

        font-weight: bold;
        font-size: .8rem;
      }
    }
  }

  .tishi{
    color: white;
    font-size: .48rem;
  }

</style>
