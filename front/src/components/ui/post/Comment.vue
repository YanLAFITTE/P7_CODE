<script>
export default {
  props: {
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>
<template>
  <div class="d-flex gap-1">
    <div class="d-flex flex-column comment-infos rounded mb-2">
      <p>{{ email }}</p>
      <p>{{ content }}</p>
    </div>
  </div>
</template>
<style scoped>
.comment-infos {
  background-color: hsl(0, 100%, 95%);
  width: 100%;
  padding: 10px;
}
.card-body > .d-flex {
  margin-bottom: 1rem;
}

.d-flex p {
  margin-bottom: 0;
}
.d-flex p:nth-child(1) {
  font-weight: 700;
}
</style>
