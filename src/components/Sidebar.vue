<template>
  <div class="page-sidebar p-2 d-flex flex-column justify-content-between">
    <div>
      <div class="company-name px-3 py-2 my-2">
        <h6 class="m-0" @click="$router.push('/')">{{ companyName }}</h6>
      </div>
      <div>
        <transition-group name="slide-fade" mode="out-in">
          <div v-for="group in groups" :key="group">
            <div
              :class="['sidebar-item px-1 py-2', activeGroup === group ? 'active' : '']"
              @click="toggleGroup(group)"
              style="user-select: none;"
            >
              <div class="group-title d-flex align-items-center">
                <feather-icon
                  class="mr-2"
                  :name="openGroup === group ? 'chevron-down' : 'chevron-right'"
                />
                {{group }}
              </div>
            </div>
            <transition name="slide-fade" mode="out-in">
              <div v-if="openGroup === group">
                <div
                  v-for="item in groupItems"
                  style="user-select: none;"
                  :class="['sidebar-item pl-4 ml-2 py-2 ', isCurrentRoute(item.route) ? 'active' : '']"
                  @click="routeTo(item.route)"
                  :key="item.label"
                >
                  <div class="group-item-title d-flex align-items-center">{{ item.label }}</div>
                </div>
              </div>
            </transition>
          </div>
        </transition-group>
      </div>
    </div>
    <div
      class="sidebar-item px-3 py-2 d-flex align-items-center"
      v-if="dbFileName"
      @click="goToDatabaseSelector"
    >
      <feather-icon class="mr-2" name="settings"></feather-icon>
      <span>{{ dbFileName }}</span>
    </div>
  </div>
</template>
<script>
import sidebarConfig from '../sidebarConfig';
export default {
  data() {
    return {
      companyName: '',
      dbFileName: '',
      groups: [],
      groupItems: [],
      activeGroup: undefined,
      openGroup: undefined
    };
  },
  async mounted() {
    this.companyName = await sidebarConfig.getTitle();
    this.dbFileName = await sidebarConfig.getDbName();
    this.groups = sidebarConfig.getGroups();
    this.setActive();
  },
  methods: {
    setActive() {
      let currentRoute = this.$route.fullPath;
      // check each group items
      this.groups.forEach(groupTitle => {
        // filter items which contains the current route
        sidebarConfig.getItems(groupTitle).some(item => {
          // check for substring 'list' 'SalesInvoice' etc.
          let found = false;
          currentRoute.split('/').some(str => {
            if (str.length) {
              item.route.indexOf(str) > -1 ? (found = true) : (found = false);
            }
            if (found) {
              this.toggleGroup(groupTitle);
              return found;
            }
          });
          return found;
        });
      });
    },
    isCurrentRoute(route) {
      if (this.activeGroup) return false;
      return this.$route.fullPath === route;
    },
    toggleGroup(groupTitle) {
      this.groupItems =
        this.activeGroup === groupTitle
          ? []
          : sidebarConfig.getItems(groupTitle);
      this.activeGroup =
        this.activeGroup === groupTitle ? undefined : groupTitle;
      this.openGroup = this.activeGroup === groupTitle ? groupTitle : undefined;
    },
    routeTo(route) {
      this.activeGroup = undefined;
      this.$router.push(route);
    },
    goToDatabaseSelector() {
      localStorage.dbPath = '';
      window.location.reload();
    }
  }
};
</script>

<style lang="scss">
@import '../styles/variables.scss';
@import '../styles/animation.scss';

.company-name {
  cursor: pointer;
}
.page-sidebar {
  background-color: $light;
  color: $dark;
  height: 100vh;
  min-width: 184px;
  max-width: 184px;
}

.group-title {
  font-weight: 600;
}

.group-item-title {
  // font-weight: 350;
  font-size: 0.9rem;
}

.sidebar-item {
  cursor: pointer;
  border-radius: $border-radius;

  // &:hover {
  //   color: $gray-300;
  // }

  &.active {
    font-weight: 600 !important;
    color: $primary-light;
    background-color: $white;
  }
}
</style>
