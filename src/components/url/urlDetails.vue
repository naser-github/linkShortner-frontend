<template>
  <div class="card">
    <div class="row">
      <div class="col-6">
        <div class="card-body">
          <div class="callout callout-info">
            <h6 class="font-weight-semibold text-break">
              <a :href="url.longUrl" class="copy-click">
                {{ this.url.longUrl }}
              </a>
            </h6>
            <span class="font-weight-semibold badge bg-warning">
              Original Url
            </span>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card-body">
          <div class="callout callout-success">
            <div class="d-sm-flex align-item-sm-center flex-sm-nowrap">
              <div>
                <h6 class="font-weight-semibold text-break">
                  <a :href="url.shortUrl" class="copy-click">
                    {{ this.url.shortUrl }}
                  </a>
                </h6>
                <span class="font-weight-semibold badge bg-warning">
                  Shortened Url
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url"],
};
</script>

<style scoped>
.copy-click {
  position: relative;
  padding-bottom: 2px;
  text-decoration: none;
  cursor: copy;
  color: #000000;
  border-bottom: 1px dashed #767676;
  transition: background-color calc(var(--duration) * 2) var(--ease);
}
.copy-click:hover {
  color: #ff0000;
}

/* .copy-click:after {
  content: attr(data-tooltip-text);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  padding: 8px 16px;
  white-space: nowrap;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 0 -12px rgba(0, 0, 0, 0);
  pointer-events: none;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  opacity: 0;
  -webkit-transform: translate(-50%, 12px);
  transform: translate(-50%, 12px);
  transition: box-shadow calc(var(--duration) / 1.5) var(--bounce),
    opacity calc(var(--duration) / 1.5) var(--bounce),
    -webkit-transform calc(var(--duration) / 1.5) var(--bounce);
  transition: box-shadow calc(var(--duration) / 1.5) var(--bounce),
    opacity calc(var(--duration) / 1.5) var(--bounce),
    transform calc(var(--duration) / 1.5) var(--bounce);
  transition: box-shadow calc(var(--duration) / 1.5) var(--bounce),
    opacity calc(var(--duration) / 1.5) var(--bounce),
    transform calc(var(--duration) / 1.5) var(--bounce),
    -webkit-transform calc(var(--duration) / 1.5) var(--bounce);
}

.copy-click.is-hovered:after {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 1;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  transition-timing-function: var(--ease);
}

.copy-click.is-copied {
  background-color: yellow;
}

.copy-click.is-copied:after {
  content: attr(data-tooltip-text-copied);
} */
</style>