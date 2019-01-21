/**
 * TeX block.
 *
 * @package ssl-alp
 */

( function( wp ) {
	/**
	 * New block registration function.
	 */
	var registerBlockType = wp.blocks.registerBlockType;

	/**
	 * Element creator.
	 */
	var el = wp.element.createElement;

	/**
	 * Raw HTML element.
	 */
	var rawHTML = wp.element.RawHTML;

	/**
	 * Retrieves the translation of text.
	 *
	 * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
	 */
	var __ = wp.i18n.__;

	/**
	 * DOM parser.
	 */
	const parser = new DOMParser();

	/**
	 * Render mathematical formula using KaTeX.
	 *
	 * @param {*} formula Mathematical formula to render.
	 */
	const katexDisplay = (formula) => {
		const doc = parser.parseFromString(
			'<!doctype html><body>' + formula + '</body></html>',
		    'text/html'
		);

		try {
			display = katex.renderToString(
				doc.body.textContent,
				{
					displayMode: 'true',
					throwOnError: false
				}
			);
		} catch( e ) {
			display = `\
				<span style='color: red; text-align: center;'>\
					${e};\
				</span>`;
		}

		return display;
	}

	const texIcon = el(
		'svg',
		{
			width: 24,
			height: 24
		},
		el(
			'path',
			{
				d: "m 5.447379,9.2239186 h 1.4803921 c 0.3442774,0 0.5164161,0 0.5164161,-0.3442771 0,-0.1893526 -0.1721387,-0.1893526 -0.4819882,-0.1893526 H 5.5506621 L 5.8949394,6.7313512 C 5.9637948,6.3733028 6.204789,5.1545612 6.3080721,4.9514379 6.4802108,4.6243743 6.7556325,4.3661665 7.1343376,4.3661665 c 0.068856,0 0.5164159,0 0.8262655,0.3098493 -0.75741,0.065413 -0.9295487,0.6678979 -0.9295487,0.9261059 0,0.392476 0.3098495,0.5990425 0.6541268,0.5990425 0.4475605,0 0.9295487,-0.3787049 0.9295487,-1.0293889 0,-0.7918379 -0.7918377,-1.1843139 -1.4803923,-1.1843139 -0.5852714,0 -1.6869586,0.3064066 -2.2033747,2.0071363 C 4.8621071,6.356089 4.7932521,6.5282276 4.3801195,8.6902889 H 3.2095767 c -0.3442774,0 -0.5164159,0 -0.5164159,0.3236207 0,0.210009 0.1377109,0.210009 0.4819882,0.210009 H 4.3112641 L 3.0030103,15.995854 c -0.3098495,1.662858 -0.5852714,3.225878 -1.4803923,3.225878 -0.068856,0 -0.516416,0 -0.82626553,-0.30985 0.79183783,-0.0482 0.92954863,-0.667898 0.92954863,-0.926107 0,-0.392476 -0.3098495,-0.602485 -0.6196991,-0.602485 -0.44756044,0 -0.96397636,0.375262 -0.96397636,1.032831 0,0.76774 0.75741,1.184317 1.48039236,1.184317 0.9295486,0 1.6181033,-1.012176 1.9279527,-1.669747 0.5508438,-1.081031 0.9295488,-3.150137 0.9639764,-3.274076 z",
			}
		),
		el(
			'path',
			{
				d: "m 17.256223,10.308403 v -0.04476 l 0.03444,-0.05163 v -0.05507 l 0.03443,-0.06196 v -0.06886 l 0.03443,-0.06886 v -0.07574 l 0.03443,-0.07574 0.03443,-0.082637 0.03443,-0.082624 0.03443,-0.082637 0.03443,-0.086064 0.03443,-0.086064 0.03443,-0.086064 0.03443,-0.086064 0.06886,-0.082637 0.03443,-0.082624 0.06886,-0.082637 0.06886,-0.079169 0.03443,-0.079182 0.06886,-0.0723 0.06886,-0.068859 0.06886,-0.065409 0.06886,-0.06197 0.103283,-0.055085 0.06886,-0.048199 0.03443,-0.0241 0.06886,-0.020658 0.03444,-0.017214 0.03443,-0.017214 0.06886,-0.017214 0.03443,-0.013771 0.06886,-0.010336 0.03444,-0.010336 0.06886,-0.00689 0.03443,-0.00689 0.06886,-0.00344 h 0.03443 c 0.103284,0 0.516419,0 0.860696,0.2203374 -0.48199,0.086068 -0.826266,0.5164149 -0.826266,0.9226632 0,0.2754218 0.206566,0.6024861 0.654127,0.6024861 0.378704,0 0.929548,-0.3064077 0.929548,-0.9949625 0,-0.8916778 -0.998403,-1.1292293 -1.583675,-1.1292293 -0.998404,0 -1.583676,0.9088923 -1.790241,1.3013686 -0.447562,-1.1292299 -1.377111,-1.3013686 -1.859098,-1.3013686 -1.790241,0 -2.754218,2.2102588 -2.754218,2.6406058 0,0.172141 0.172139,0.172141 0.206564,0.172141 0.137713,0 0.17214,-0.03444 0.206569,-0.185911 0.58527,-1.8177836 1.721385,-2.2481306 2.306657,-2.2481306 0.309849,0 0.929548,0.1480392 0.929548,1.1430006 0,0.5336295 -0.30985,1.686958 -0.929548,4.083128 -0.275421,1.06726 -0.860693,1.786799 -1.65253,1.786799 -0.06886,0 -0.48199,0 -0.826267,-0.223778 0.413134,-0.08264 0.791837,-0.444119 0.791837,-0.926109 0,-0.464773 -0.378703,-0.59904 -0.619697,-0.59904 -0.516417,0 -0.963976,0.44756 -0.963976,0.99496 0,0.788396 0.860692,1.132672 1.618103,1.132672 1.136115,0 1.755812,-1.201528 1.790243,-1.30481 0.206564,0.636914 0.826264,1.30481 1.859094,1.30481 1.790243,0 2.75422,-2.213703 2.75422,-2.644049 0,-0.172138 -0.172138,-0.172138 -0.206567,-0.172138 -0.172138,0 -0.206566,0.0723 -0.240994,0.189351 -0.550844,1.834998 -1.721385,2.248131 -2.27223,2.248131 -0.654126,0 -0.929549,-0.5474 -0.929549,-1.136114 0,-0.375263 0.103284,-0.750525 0.275423,-1.504492 z",
			}
		),
		el(
			'path',
			{
				d: "m 11.71454,19.88954 v -0.0067 -0.01006 -0.0033 -0.0067 -0.0033 -0.0067 -0.0067 -0.0033 -0.0067 -0.0067 -0.01006 -0.0067 -0.0067 l -0.02678,-0.01006 v -0.01005 -0.01006 -0.01327 l -0.02678,-0.01005 v -0.0067 -0.0067 -0.0067 -0.0067 l -0.02678,-0.0067 v -0.01006 -0.0067 -0.0067 -0.01006 L 11.60742,19.67536 V 19.66866 19.6586 19.64854 L 11.58064,19.63849 V 19.62843 19.61838 L 11.55386,19.60832 V 19.59827 19.585 L 11.52708,19.57495 V 19.56168 19.54841 L 11.5003,19.53835 V 19.52508 C 9.8404975,17.44424 9.4121557,14.323219 9.4121557,11.795886 c 0,-2.8789027 0.5086558,-5.7544887 2.1417093,-7.8174812 0.160628,-0.2023191 0.160628,-0.2321695 0.160628,-0.2852371 0,-0.1127682 -0.02678,-0.1592019 -0.107086,-0.1592019 -0.133856,0 -1.338567,1.1177308 -2.1417086,3.217207 -0.6692841,1.8208728 -0.8299122,3.6550112 -0.8299122,5.0447132 0,1.290199 0.1338567,3.283541 0.8834549,5.154166 0.8031399,2.033141 1.9543099,3.104437 2.0881659,3.104437 0.08031,0 0.107086,-0.04642 0.107086,-0.165834 z",
			}
		),
		el(
			'path',
			{
				d: "M 23.949052,11.795609 V 11.669573 11.54354 11.414186 11.278201 l -0.02678,-0.278602 V 10.707727 L 23.895504,10.40259 23.86873,10.087503 23.841956,9.762466 23.788407,9.430795 23.734881,9.0924909 23.681339,8.7475532 23.601025,8.3992988 23.520712,8.0477277 23.413625,7.6961567 23.30654,7.3412689 23.252997,7.1654833 23.199455,6.9896977 23.145911,6.8139123 23.065597,6.6381267 c -0.80314,-2.0331421 -1.927538,-3.104439 -2.061394,-3.104439 -0.08031,0 -0.133856,0.063018 -0.133856,0.1592019 0,0.053068 0,0.082918 0.240941,0.3847385 1.311797,1.6318203 2.061395,4.2586534 2.061395,7.7179809 0,2.822518 -0.481884,5.731272 -2.141709,7.814165 -0.160627,0.195686 -0.160627,0.23217 -0.160627,0.278604 0,0.0995 0.05354,0.165834 0.133856,0.165834 0.133856,0 1.311795,-1.124364 2.114938,-3.22384 0.669283,-1.81424 0.829911,-3.64838 0.829911,-5.034763 z",
			}
		)
	);

	/**
	 * Every block starts by registering a new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 */
	registerBlockType( 'ssl-alp/tex', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'TeX', 'ssl-alp' ),

		description: __( 'Render mathematical markup using TeX syntax.', 'ssl-alp' ),

		keywords: [
			__( 'LaTeX', 'ssl-alp' ),
			__( 'Mathematics', 'ssl-alp' ),
			__( 'Equation', 'ssl-alp' )
		],

		/**
		 * This is the icon.
		 */
		icon: texIcon,

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'common',

		/**
		 * Saved block attributes.
		 */
		attributes: {
			formula: {
				source: 'html',
				selector: 'div',
				type: 'string',
			},
		},

		/**
		 * Optional block extended support features.
		 */
		supports: {
			// Removes support for editing in HTML mode.
			html: false,
			customClassName: false,
			className: false,
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		edit: function( props ) {
			const { isSelected, attributes, setAttributes, className } = props;
			const { formula } = attributes;

			let display = katexDisplay( formula );

			if ( isSelected ) {
				return el(
					'div',
					{ className: props.className },
					el(
						'label',
						null,
						__( 'Formula:', 'ssl-alp' ),
						el(
							'textarea',
							{
								className: 'ssl-alp-tex-formula',
							    onChange: ( event ) => {
									setAttributes( { formula: event.target.value } );
								},
								value: formula,
								style: {
									width: '100%'
								},
								spellCheck: false
							}
						)
					)
				);
			} else {
				return el(
					'div',
					{
						className: 'ssl-alp-tex',
						'data-katex-display': true
					},
					el(
						rawHTML,
						{},
						display
					)
				);
			}
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function save( { attributes } ) {
			const { formula } = attributes;

			return el(
				'div',
				{
					className: 'ssl-alp-tex',
					'data-katex-display': true
				},
				el(
					rawHTML,
					{},
					formula
				)
			);
		},
	} );
} )(
	window.wp
);
