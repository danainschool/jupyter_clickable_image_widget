import ipywidgets as widgets
from traitlets import Unicode
from ._version import NPM_PACKAGE_RANGE
# See js/lib/example.js for the frontend counterpart to this file.

@widgets.register
class ClickableImageWidget(widgets.Image):
    """An example widget."""

    # Name of the widget view class in front-end
    _view_name = Unicode('ClickableImageView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('ClickableImageModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('jupyter_clickable_image_widget').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('jupyter_clickable_image_widget').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is touched.
#     value = Unicode('Hello World!').tag(sync=True)
