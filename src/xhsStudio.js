(function () {
  const storageKey = "xhsStudioConfig:v1";
  const tabs = [
    ["post", "小红书三页图文"],
    ["product", "商品详情页"],
    ["titles", "标题库"],
    ["bodies", "正文模板"],
    ["comments", "评论话术"],
    ["delivery", "自动发货话术"],
    ["config", "配置导入导出"]
  ];
  const defaultPreset = window.XHS_STUDIO_DEFAULT_PRESET || {};
  const studioState = {
    activeTab: "post",
    capture: null
  };

  if (typeof render !== "function") return;
  const previousRender = render;

  render = function () {
    const route = getRoute();
    if (route === "xhs-studio") {
      app.innerHTML = renderStudio();
      return;
    }
    if (route === "xhs-product") {
      app.innerHTML = renderProductPage();
      return;
    }
    previousRender();
  };

  document.addEventListener("input", event => {
    const field = event.target.closest("[data-studio-field]");
    if (!field || getRoute() !== "xhs-studio") return;
    const config = getConfig();
    setPath(config, field.dataset.studioField, field.value);
    saveConfig(config);
    refreshStudioPreviews();
  });

  document.addEventListener("click", event => {
    const actionButton = event.target.closest("[data-studio-action]");
    if (actionButton) {
      handleStudioAction(actionButton);
      return;
    }

    const copyButton = event.target.closest("[data-studio-copy]");
    if (copyButton) {
      copyText(resolveCopyText(copyButton.dataset.studioCopy));
    }
  });

  function getRoute() {
    return location.hash.replace(/^#\/?/, "").split("/").filter(Boolean)[0] || "home";
  }

  function getConfig() {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return clone(defaultPreset);
    try {
      return mergeDefaults(clone(defaultPreset), JSON.parse(stored));
    } catch (error) {
      return clone(defaultPreset);
    }
  }

  function saveConfig(config) {
    localStorage.setItem(storageKey, JSON.stringify(config));
  }

  function resetConfig() {
    localStorage.removeItem(storageKey);
    studioState.capture = null;
    render();
    toast("已恢复默认模板");
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeDefaults(base, override) {
    if (!override || typeof override !== "object") return base;
    Object.keys(override).forEach(key => {
      if (Array.isArray(override[key])) {
        base[key] = override[key];
        return;
      }
      if (override[key] && typeof override[key] === "object" && base[key] && typeof base[key] === "object" && !Array.isArray(base[key])) {
        base[key] = mergeDefaults(base[key], override[key]);
        return;
      }
      base[key] = override[key];
    });
    return base;
  }

  function setPath(object, path, value) {
    const parts = path.split(".");
    let current = object;
    parts.slice(0, -1).forEach(part => {
      if (current[part] == null) current[part] = {};
      current = current[part];
    });
    current[parts[parts.length - 1]] = value;
  }

  function renderStudio() {
    const config = getConfig();
    if (studioState.capture) return renderCaptureMode(config);

    return `
      <main class="studio-page">
        <header class="studio-header">
          <div>
            <p>小红书素材工作台</p>
            <h1>可编辑素材，不改代码也能更新文案</h1>
          </div>
          <div class="studio-header-actions">
            <a href="#/test/work-or-life">正式测试</a>
            <button type="button" data-studio-action="reset">恢复默认模板</button>
          </div>
        </header>
        <nav class="studio-tabs" aria-label="素材类型">
          ${tabs.map(([id, label]) => `<button class="${studioState.activeTab === id ? "active" : ""}" type="button" data-studio-action="tab" data-tab="${id}">${label}</button>`).join("")}
        </nav>
        <section class="studio-layout">
          <div class="studio-editor">${renderEditor(config, studioState.activeTab)}</div>
          <div class="studio-preview-area">${renderPreview(config, studioState.activeTab)}</div>
        </section>
      </main>
    `;
  }

  function renderEditor(config, tab) {
    if (tab === "post") return renderPostEditor(config);
    if (tab === "product") return renderProductEditor(config);
    if (tab === "titles") return renderTitlesEditor(config);
    if (tab === "bodies") return renderBodyEditor(config);
    if (tab === "comments") return renderCommentsEditor(config);
    if (tab === "delivery") return renderDeliveryEditor(config);
    return renderConfigEditor(config);
  }

  function renderPreview(config, tab) {
    if (tab === "post") return renderPostPreview(config);
    if (tab === "product") return renderProductPreview(config, true);
    if (tab === "titles") return renderCopyGrid(flattenTitles(config));
    if (tab === "bodies") return renderLongCopyPreview(config.bodyTemplates.map(item => [item.name, item.text]));
    if (tab === "comments") return renderLongCopyPreview(config.comments.map(item => [item.name, item.text]));
    if (tab === "delivery") return renderLongCopyPreview(config.deliveryScripts.map(item => [item.name, item.text]));
    return renderConfigPreview(config);
  }

  function refreshStudioPreviews() {
    const area = document.querySelector(".studio-preview-area");
    if (area) area.innerHTML = renderPreview(getConfig(), studioState.activeTab);
    const exportBox = document.querySelector("[data-studio-export]");
    if (exportBox) exportBox.value = JSON.stringify(getConfig(), null, 2);
  }

  function renderPostEditor(config) {
    return `
      ${panel("第 1 页封面", `
        ${field("顶部小字", "post.cards.0.topline", config.post.cards[0].topline)}
        ${field("主标题", "post.cards.0.title", config.post.cards[0].title, true)}
        ${field("副标题", "post.cards.0.subtitle", config.post.cards[0].subtitle)}
        ${field("底部文案", "post.cards.0.bottom", config.post.cards[0].bottom)}
        ${field("左侧标签", "post.cards.0.leftLabel", config.post.cards[0].leftLabel)}
        ${field("右侧标签", "post.cards.0.rightLabel", config.post.cards[0].rightLabel)}
      `)}
      ${panel("第 2 页免费题 1-2", `
        ${field("顶部文案", "post.cards.1.intro", config.post.cards[1].intro)}
        ${renderQuestionEditors(config, 1)}
      `)}
      ${panel("第 3 页免费题 3-5", renderQuestionEditors(config, 2))}
      ${panel("小红书正文和话题", `
        ${field("小红书正文", "post.body", config.post.body, true)}
        ${field("话题标签", "post.tags", config.post.tags, true)}
      `)}
    `;
  }

  function renderQuestionEditors(config, cardIndex) {
    return config.post.cards[cardIndex].questions.map((question, questionIndex) => `
      <div class="studio-question-edit">
        <h3>题目 ${cardIndex === 1 ? questionIndex + 1 : questionIndex + 3}</h3>
        ${field("题干", `post.cards.${cardIndex}.questions.${questionIndex}.title`, question.title, true)}
        ${question.options.map((option, optionIndex) => field(`${["A", "B", "C", "D"][optionIndex]} 选项`, `post.cards.${cardIndex}.questions.${questionIndex}.options.${optionIndex}`, option)).join("")}
      </div>
    `).join("");
  }

  function renderProductEditor(config) {
    return `
      ${panel("商品主图海报", `
        ${field("主标题", "product.poster.title", config.product.poster.title, true)}
        ${field("副标题", "product.poster.subtitle", config.product.poster.subtitle)}
        ${field("说明文案", "product.poster.description", config.product.poster.description, true)}
        ${field("便利贴文案", "product.poster.note", config.product.poster.note, true)}
        ${config.product.poster.benefits.map((benefit, index) => field(`底部卖点 ${index + 1}`, `product.poster.benefits.${index}`, benefit)).join("")}
      `)}
      ${panel("商品信息", `
        ${field("商品标题", "product.title", config.product.title)}
        ${field("价格", "product.price", config.product.price)}
        ${field("辅助说明", "product.aux", config.product.aux, true)}
      `)}
      ${panel("详情正文", field("商品详情正文", "product.detail", config.product.detail, true))}
      ${panel("购买须知", field("购买须知", "product.purchaseNotice", config.product.purchaseNotice, true))}
      ${panel("自动发货话术", field("自动发货话术", "product.deliveryScript", config.product.deliveryScript, true))}
    `;
  }

  function renderTitlesEditor(config) {
    return Object.entries(config.titles).map(([category, list]) => panel(category, list.map((title, index) => field(`标题 ${index + 1}`, `titles.${category}.${index}`, title)).join(""))).join("");
  }

  function renderBodyEditor(config) {
    return config.bodyTemplates.map((item, index) => panel(item.name, `
      ${field("模板名称", `bodyTemplates.${index}.name`, item.name)}
      ${field("正文内容", `bodyTemplates.${index}.text`, item.text, true)}
      <button type="button" class="studio-mini-copy" data-studio-copy="body:${index}">复制这篇正文</button>
    `)).join("");
  }

  function renderCommentsEditor(config) {
    return config.comments.map((item, index) => panel(`${index + 1}. ${escapeHtml(item.name)}`, `
      ${field("名称", `comments.${index}.name`, item.name)}
      ${field("话术", `comments.${index}.text`, item.text, true)}
      <button type="button" class="studio-mini-copy" data-studio-copy="comment:${index}">复制这条评论</button>
    `)).join("");
  }

  function renderDeliveryEditor(config) {
    return config.deliveryScripts.map((item, index) => panel(item.name, `
      ${field("版本名称", `deliveryScripts.${index}.name`, item.name)}
      ${field("话术", `deliveryScripts.${index}.text`, item.text, true)}
      <button type="button" class="studio-mini-copy" data-studio-copy="delivery:${index}">复制这版话术</button>
    `)).join("");
  }

  function renderConfigEditor(config) {
    return `
      ${panel("导出当前配置", `
        <p class="studio-help">导出的 JSON 可以保存为一个项目配置；以后导入后会覆盖当前本地模板。</p>
        <textarea class="studio-json-box" data-studio-export readonly>${escapeHtml(JSON.stringify(config, null, 2))}</textarea>
        <div class="studio-row-actions">
          <button type="button" data-studio-action="copy-json">复制 JSON</button>
          <button type="button" data-studio-action="download-json">下载 JSON</button>
        </div>
      `)}
      ${panel("导入配置 JSON", `
        <p class="studio-help">把之前导出的 JSON 粘贴到这里，点击导入即可实时生成新的素材模板。</p>
        <textarea class="studio-json-box" data-studio-import placeholder="粘贴 JSON 配置"></textarea>
        <button type="button" data-studio-action="import-json">导入配置</button>
      `)}
    `;
  }

  function renderPostPreview(config) {
    return `
      <section class="studio-preview-panel">
        <div class="studio-preview-title">
          <h2>三页图文预览</h2>
          <span>可单独截图或下载</span>
        </div>
        ${config.post.cards.map((card, index) => `
          <div class="studio-shot-block">
            ${renderPostCard(card, index)}
            <div class="studio-card-actions">
              <button type="button" data-studio-copy="post-card:${index}">复制本页文案</button>
              <button type="button" data-studio-action="capture" data-target="post-${index}">截图模式</button>
              <button type="button" data-studio-action="download" data-target="post-${index}">下载 PNG</button>
            </div>
          </div>
        `).join("")}
        <div class="studio-copy-box">
          <h3>小红书正文</h3>
          <p>${lineBreak(config.post.body)}</p>
          <h3>话题标签</h3>
          <p class="studio-tags">${escapeHtml(config.post.tags)}</p>
          <button type="button" data-studio-copy="post-body">复制正文和话题</button>
        </div>
      </section>
    `;
  }

  function renderPostCard(card, index) {
    if (card.type === "cover") {
      return `
        <article class="studio-card studio-cover" data-shot="post-${index}">
          <div class="studio-card-topline">${escapeHtml(card.topline)}</div>
          <h2>${lineBreak(card.title)}</h2>
          <p class="studio-cover-sub">${escapeHtml(card.subtitle)}</p>
          <div class="studio-door-scene" aria-hidden="true">
            <div class="studio-door is-work">
              <span>${escapeHtml(card.leftLabel)}</span>
              <i class="studio-window"></i>
              <i class="studio-monitor"></i>
              <i class="studio-paper"></i>
              <i class="studio-clock"></i>
            </div>
            <div class="studio-person"><i></i><b></b><em></em></div>
            <div class="studio-door is-life">
              <span>${escapeHtml(card.rightLabel)}</span>
              <i class="studio-sun"></i>
              <i class="studio-plant"></i>
              <i class="studio-book"></i>
              <i class="studio-path"></i>
            </div>
          </div>
          <div class="studio-cover-bottom">${escapeHtml(card.bottom)}</div>
        </article>
      `;
    }

    const startNumber = index === 1 ? 1 : 3;
    return `
      <article class="studio-card studio-questions ${index === 2 ? "is-long" : ""}" data-shot="post-${index}">
        ${card.intro ? `<div class="studio-question-intro">${escapeHtml(card.intro)}</div>` : ""}
        <div class="studio-question-list">
          ${card.questions.map((question, questionIndex) => renderFreeQuestion(question, startNumber + questionIndex)).join("")}
        </div>
      </article>
    `;
  }

  function renderFreeQuestion(question, number) {
    return `
      <div class="studio-free-question">
        <h3><span>${number}</span>${lineBreak(question.title)}</h3>
        <ol>
          ${question.options.map((option, index) => `<li><b>${["A", "B", "C", "D"][index]}.</b>${escapeHtml(option)}</li>`).join("")}
        </ol>
      </div>
    `;
  }

  function renderProductPreview(config, withActions) {
    return `
      <section class="studio-preview-panel">
        <div class="studio-preview-title">
          <h2>商品详情页预览</h2>
          <span>主图、详情、须知、发货话术</span>
        </div>
        <div class="studio-shot-block">
          ${renderProductPoster(config)}
          ${withActions ? `<div class="studio-card-actions">
            <button type="button" data-studio-action="capture" data-target="product-poster">截图模式</button>
            <button type="button" data-studio-action="download" data-target="product-poster">下载 PNG</button>
          </div>` : ""}
        </div>
        <article class="studio-product-detail">
          <div class="studio-product-head">
            <h2>${escapeHtml(config.product.title)}</h2>
            <strong>${escapeHtml(config.product.price)}</strong>
            <span>${lineBreak(config.product.aux)}</span>
          </div>
          ${copySection("商品详情正文", config.product.detail, "product-detail")}
          ${copySection("购买须知", config.product.purchaseNotice, "product-notice")}
          ${copySection("自动发货话术", config.product.deliveryScript, "product-delivery")}
        </article>
      </section>
    `;
  }

  function renderProductPoster(config) {
    const poster = config.product.poster;
    return `
      <article class="studio-product-poster" data-shot="product-poster">
        <div class="studio-poster-title">${lineBreak(poster.title)}</div>
        <div class="studio-poster-sub">${escapeHtml(poster.subtitle)}</div>
        <div class="studio-poster-scene">
          <div class="studio-city">
            <span></span><span></span><span></span>
          </div>
          <div class="studio-sign">
            <b>换工作</b>
            <b>换活法</b>
          </div>
          <div class="studio-field"><i></i><i></i></div>
          <div class="studio-poster-person"></div>
          <div class="studio-sticky">${lineBreak(poster.note)}</div>
        </div>
        <p class="studio-poster-desc">${lineBreak(poster.description)}</p>
        <div class="studio-benefits">
          ${poster.benefits.map(benefit => `<span>${escapeHtml(benefit)}</span>`).join("")}
        </div>
      </article>
    `;
  }

  function renderCopyGrid(items) {
    return `
      <section class="studio-preview-panel">
        <div class="studio-preview-title">
          <h2>标题预览</h2>
          <span>点击复制单条标题</span>
        </div>
        <div class="studio-title-grid">
          ${items.map(([label, text]) => `<button type="button" data-studio-copy="raw:${escapeAttr(text)}"><small>${escapeHtml(label)}</small>${escapeHtml(text)}</button>`).join("")}
        </div>
      </section>
    `;
  }

  function renderLongCopyPreview(items) {
    return `
      <section class="studio-preview-panel">
        ${items.map(([name, text], index) => `
          <div class="studio-copy-box">
            <h3>${escapeHtml(name)}</h3>
            <p>${lineBreak(text)}</p>
            <button type="button" data-studio-copy="raw-index:${studioState.activeTab}:${index}">复制</button>
          </div>
        `).join("")}
      </section>
    `;
  }

  function renderConfigPreview(config) {
    return `
      <section class="studio-preview-panel">
        <div class="studio-copy-box">
          <h3>当前配置摘要</h3>
          <p>版本：${escapeHtml(config.version || "未命名")}</p>
          <p>测试链接占位：${escapeHtml(config.testLink || "")}</p>
          <p>已保存到本机 localStorage。刷新页面后，修改仍会保留。</p>
        </div>
      </section>
    `;
  }

  function renderProductPage() {
    const config = getConfig();
    return `
      <main class="studio-page studio-product-only">
        <header class="studio-header">
          <div>
            <p>商品详情页预览</p>
            <h1>${escapeHtml(config.product.title)}</h1>
          </div>
          <div class="studio-header-actions">
            <a href="#/xhs-studio">编辑素材</a>
            <a href="#/test/work-or-life">正式测试</a>
          </div>
        </header>
        ${renderProductPreview(config, false)}
      </main>
    `;
  }

  function renderCaptureMode(config) {
    const target = studioState.capture;
    let content = "";
    if (target.startsWith("post-")) {
      const index = Number(target.replace("post-", ""));
      content = renderPostCard(config.post.cards[index], index);
    } else if (target === "product-poster") {
      content = renderProductPoster(config);
    }
    return `
      <main class="studio-capture-page">
        <div class="studio-capture-actions">
          <button type="button" data-studio-action="exit-capture">退出截图模式</button>
          <button type="button" data-studio-action="download" data-target="${escapeAttr(target)}">下载 PNG</button>
        </div>
        <div class="studio-capture-stage">${content}</div>
      </main>
    `;
  }

  function copySection(title, text, key) {
    return `
      <section class="studio-copy-box">
        <h3>${escapeHtml(title)}</h3>
        <p>${lineBreak(text)}</p>
        <button type="button" data-studio-copy="${key}">复制${escapeHtml(title)}</button>
      </section>
    `;
  }

  function panel(title, content) {
    return `<section class="studio-panel"><h2>${escapeHtml(title)}</h2>${content}</section>`;
  }

  function field(label, path, value, multiline) {
    return `
      <label class="studio-field">
        <span>${escapeHtml(label)}</span>
        ${multiline
          ? `<textarea data-studio-field="${escapeAttr(path)}">${escapeHtml(value || "")}</textarea>`
          : `<input type="text" data-studio-field="${escapeAttr(path)}" value="${escapeAttr(value || "")}">`}
      </label>
    `;
  }

  function flattenTitles(config) {
    return Object.entries(config.titles).flatMap(([category, list]) => list.map(title => [category, title]));
  }

  function resolveCopyText(token) {
    const config = getConfig();
    if (token === "post-body") return `${config.post.body}\n\n${config.post.tags}`;
    if (token && token.startsWith("post-card:")) return postCardText(config, Number(token.split(":")[1]));
    if (token === "product-detail") return config.product.detail;
    if (token === "product-notice") return config.product.purchaseNotice;
    if (token === "product-delivery") return config.product.deliveryScript;
    if (token && token.startsWith("body:")) return config.bodyTemplates[Number(token.split(":")[1])].text;
    if (token && token.startsWith("comment:")) return config.comments[Number(token.split(":")[1])].text;
    if (token && token.startsWith("delivery:")) return config.deliveryScripts[Number(token.split(":")[1])].text;
    if (token && token.startsWith("raw:")) return token.slice(4);
    if (token && token.startsWith("raw-index:")) {
      const [, tab, indexText] = token.split(":");
      const index = Number(indexText);
      if (tab === "bodies") return config.bodyTemplates[index].text;
      if (tab === "comments") return config.comments[index].text;
      if (tab === "delivery") return config.deliveryScripts[index].text;
    }
    return "";
  }

  function postCardText(config, index) {
    const card = config.post.cards[index];
    if (card.type === "cover") {
      return `第 1 张封面图\n\n顶部小字：\n${card.topline}\n\n主标题：\n${card.title}\n\n副标题：\n${card.subtitle}\n\n底部文案：\n${card.bottom}`;
    }
    const startNumber = index === 1 ? 1 : 3;
    return `${card.intro ? `${card.intro}\n\n` : ""}${card.questions.map((question, questionIndex) => {
      const number = startNumber + questionIndex;
      return `${number}. ${question.title}\n\n${question.options.map((option, optionIndex) => `${["A", "B", "C", "D"][optionIndex]}. ${option}`).join("\n")}`;
    }).join("\n\n")}`;
  }

  function handleStudioAction(button) {
    const action = button.dataset.studioAction;
    if (action === "tab") {
      studioState.activeTab = button.dataset.tab || "post";
      studioState.capture = null;
      render();
      return;
    }
    if (action === "reset") {
      if (confirm("确认恢复默认模板？当前本地修改会被清空。")) resetConfig();
      return;
    }
    if (action === "capture") {
      studioState.capture = button.dataset.target;
      render();
      return;
    }
    if (action === "exit-capture") {
      studioState.capture = null;
      render();
      return;
    }
    if (action === "copy-json") {
      copyText(JSON.stringify(getConfig(), null, 2));
      return;
    }
    if (action === "download-json") {
      downloadText("xhs-studio-config.json", JSON.stringify(getConfig(), null, 2), "application/json");
      return;
    }
    if (action === "import-json") {
      importJson();
      return;
    }
    if (action === "download") {
      downloadShot(button.dataset.target);
    }
  }

  function importJson() {
    const box = document.querySelector("[data-studio-import]");
    if (!box || !box.value.trim()) {
      toast("请先粘贴 JSON 配置");
      return;
    }
    try {
      const imported = JSON.parse(box.value);
      saveConfig(mergeDefaults(clone(defaultPreset), imported));
      render();
      toast("配置已导入");
    } catch (error) {
      toast("JSON 格式有误，请检查后再导入");
    }
  }

  function downloadShot(target) {
    const node = document.querySelector(`[data-shot="${target}"]`);
    if (!node) {
      toast("没有找到可导出的卡片");
      return;
    }
    const rect = node.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);
    const css = Array.from(document.styleSheets).map(sheet => {
      try {
        return Array.from(sheet.cssRules).map(rule => rule.cssText).join("\n");
      } catch (error) {
        return "";
      }
    }).join("\n");
    const html = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width * 2}" height="${height * 2}" viewBox="0 0 ${width} ${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <style>${css}</style>
            ${node.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;
    const image = new Image();
    const svgUrl = URL.createObjectURL(new Blob([html], { type: "image/svg+xml;charset=utf-8" }));
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width * 2;
      canvas.height = height * 2;
      const context = canvas.getContext("2d");
      context.scale(2, 2);
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(svgUrl);
      canvas.toBlob(blob => {
        if (!blob) {
          toast("PNG 生成失败，可使用截图模式");
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${target}.png`;
        link.click();
        URL.revokeObjectURL(url);
        toast("PNG 已生成");
      }, "image/png");
    };
    image.onerror = () => {
      URL.revokeObjectURL(svgUrl);
      toast("当前浏览器不支持导出，可使用截图模式");
    };
    image.src = svgUrl;
  }

  function downloadText(filename, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => toast("已复制"));
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "readonly");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast("已复制");
  }

  function toast(text) {
    const old = document.querySelector(".studio-toast");
    if (old) old.remove();
    const node = document.createElement("div");
    node.className = "studio-toast";
    node.textContent = text;
    document.body.appendChild(node);
    setTimeout(() => node.remove(), 1600);
  }

  function lineBreak(text) {
    return escapeHtml(text || "").replace(/\n/g, "<br>");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }

  render();
})();
