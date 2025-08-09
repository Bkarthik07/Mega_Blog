import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import Config from '../conf/config';

function RTE({ name = 'content', control, label, defaultValue = '' }) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-[#7c2d12]"
        >
          {label}
        </label>
      )}

      <Controller
          
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
<Editor
  apiKey={Config.tinymce} // ✅ your valid TinyMCE API key
  id={name}
  value={value}
  onEditorChange={onChange}
  init={{
    height: 400,
    menubar: true,
    plugins: [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'help',
  'wordcount'
],
toolbar:
  'undo redo | formatselect | ' +
  'bold italic underline | forecolor backcolor | ' +
  'alignleft aligncenter alignright alignjustify | ' +
  'bullist numlist outdent indent | removeformat | help',

    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
  }}
/>

        )}
      />
    </div>
  );
}

export default RTE;
