<template>
    <div v-if="editor" class="d-flex align-center">
        <v-btn
            icon="mdi-format-bold"
            @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'v-btn--active': editor.isActive('bold') }"
            class="rounded-0"
        ></v-btn>

        <v-btn
            icon="mdi-format-italic"
            @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'v-btn--active': editor.isActive('italic') }"
            class="rounded-0"
        ></v-btn>

        <v-btn
            icon="mdi-format-clear"
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'v-btn--active': editor.isActive('strike') }"
            class="rounded-0"
        ></v-btn>

        <v-btn
            icon="mdi-code-block-tags"
            @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'v-btn--active': editor.isActive('code') }"
            class="rounded-0"
        ></v-btn>

        <v-btn
            icon="mdi-format-header-1"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{
                'v-btn--active': editor.isActive('heading', {
                    level: 1,
                }),
            }"
            class="rounded-0"
        ></v-btn>
        <v-btn
            icon="mdi-format-header-2"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{
                'v-btn--active': editor.isActive('heading', {
                    level: 2,
                }),
            }"
            class="rounded-0"
        ></v-btn>
        <v-btn
            icon="mdi-format-header-3"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{
                'v-btn--active': editor.isActive('heading', {
                    level: 3,
                }),
            }"
            class="rounded-0"
        ></v-btn>
        <v-btn
            icon="mdi-equal-box"
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'v-btn--active': editor.isActive('blockquote') }"
            class="rounded-0"
        ></v-btn>
        <v-btn
            icon="mdi-format-list-bulleted"
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'v-btn--active': editor.isActive('bulletList') }"
            class="rounded-0"
        ></v-btn>
        <v-btn
            icon="mdi-format-list-numbered"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'v-btn--active': editor.isActive('orderedList') }"
            class="rounded-0"
        ></v-btn>
        <v-btn
            icon="mdi-minus"
            @click="editor.chain().focus().setHorizontalRule().run()"
            class="rounded-0"
        ></v-btn>

        <v-btn
            icon="mdi-undo"
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
            class="rounded-0"
        ></v-btn>
        <v-btn
            icon="mdi-redo"
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()"
            class="rounded-0"
        ></v-btn>
    </div>
    <editor-content :editor="editor" />
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
    components: {
        EditorContent,
    },
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            editor: null,
        }
    },

    watch: {
        value(value) {
            const isSame = this.editor.getHTML() === value
            if (isSame) {
                return
            }

            this.editor.commands.setContent(value, false)
        },
    },
    mounted() {
        this.editor = new Editor({
            extensions: [StarterKit],
            editorProps: {
                attributes: {
                    class: 'border border-t-md pa-4 ml-0 editor',
                },
                transformPastedText(text) {
                    return text.toUpperCase()
                },
            },
            content: this.value,
            onUpdate: () => {
                this.$emit('onUpdate', this.editor.getHTML())
            },
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
    > * + * {
        margin-top: 0.75em;
    }

    ul,
    ol {
        padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }
    min-height: 200px;
    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0d0d0d;
        color: #fff;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#78909c, 0.4);
        background: rgba(#78909c, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0d0d0d, 0.1);
        margin: 2rem 0;
    }
}
</style>
